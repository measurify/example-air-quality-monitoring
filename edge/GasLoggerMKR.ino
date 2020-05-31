/*
   Air Quality Data Logger
   Simone Benzi
   Università di Genova (DITEN)
*/

#include <NTPClient.h>
#include <MiCS6814-I2C.h>
#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>

#include "arduino_secrets.h"


char ssid[] = SECRET_SSID;         // your network SSID (name)
char pass[] = SECRET_PASS;        // your network password (use for WPA, or use as key for WEP)

int status = WL_IDLE_STATUS;


// server address:
char server[] = "students.atmosphere.tools";
int port = 80;
String token;
int preheatTime = PRE_HEAT_TIME;
unsigned long previousMillis = 0; // will store last time measurements were sent
String codeJSON;
long interval = 0; // il suo valore verrà poi deciso dallo script

// Initialize the Wifi client
WiFiClient client;
HttpClient client1 = HttpClient(client, server, port);

MiCS6814 sensor;
bool sensorConnected;

const size_t capacity = JSON_OBJECT_SIZE(1) + 290;
DynamicJsonBuffer jsonBuffer(capacity);

void setup() {

  // Initialize serial connection
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  // you're connected now, so print out the status:
  printWifiStatus();


  // Connect to sensor using default I2C address (0x04)
  // Alternatively the address can be passed to begin(addr)
  sensorConnected = sensor.begin();

  if (sensorConnected == true) {
    // Print status message
    Serial.println("Connected to MiCS-6814 sensor");

    // Turn heater element on
    sensor.powerOn();

    // Wait the required amount of time, printing
    // status every minute
    while (preheatTime > 0) {
      Serial.print(preheatTime);
      Serial.print(" ... ");

      // Wait a minute
      delay(60000);

      preheatTime = preheatTime - 1;
    }
  }
  else {
    // Print error message on failed connection
    Serial.println("Couldn't connect to MiCS-6814 sensor");
  }
  // First request to get the interval
  interval = httpRequest_script(token);
}

void loop() {
  unsigned long currentMillis = millis();
  unsigned long differenceMillis = currentMillis - previousMillis;
  if (differenceMillis > interval) {
    previousMillis = currentMillis;
    float c_ppm;
    float c_ppb;
    if (sensorConnected) {

      // Take concentration of CO
      c_ppm = sensor.measureCO();
      Serial.print("The concentration of CO is ");
      if (c_ppm >= 0) Serial.print(c_ppm);
      else Serial.print("invalid");
      Serial.println(" ppm");
      c_ppb = c_ppm * 1000;
      Serial.print(c_ppb);
      Serial.println(" ppb");
      sendGas(c_ppb, token, "CO");

      // Take concentration of NO2
      c_ppm = sensor.measureNO2();
      Serial.print("The concentration of NO2 is ");
      if (c_ppm >= 0) Serial.print(c_ppm);
      else Serial.print("invalid");
      Serial.println(" ppm");
      c_ppb = c_ppm * 1000;
      Serial.print(c_ppb);
      Serial.println(" ppb");
      sendGas(c_ppb, token, "NO2");

      // Take concentration of CH4
      c_ppm = sensor.measureCH4();
      Serial.print("The concentration of CH4 is ");
      if (c_ppm >= 0) Serial.print(c_ppm);
      else Serial.print("invalid");
      Serial.println(" ppm");
      c_ppb = c_ppm * 1000;
      Serial.print(c_ppb);
      Serial.println(" ppb");
      sendGas(c_ppb, token, "CH4");
    }
    // Wait a small amount of time
    delay(1000);
    //  while (true);
  }
  // Request to get the interval
  interval = httpRequest_script(token);
}

// these methods make an HTTP connection to the server:
void sendGas(float measurement, String& token, String gas) {
  bool authorized = false;
  int statusCode = 0;
  String response;

  while (authorized == false) {
    // close any connection before send a new request.
    // This will free the socket on the Nina module
    client.stop();

    Serial.println("making POST request");
    String contentType = "application/json";
    String postData = "{\n";
    postData += "\n\"thing\": \"room\",";
    postData += "\n\"feature\": \"" + gas + "\",";
    postData += "\n\"device\": \"air-quality-sensor\",";
    postData += "\n\"samples\": [ { \"values\": [ " + String(measurement) + " ] } ]";
    postData += "\n}";
    Serial.println(postData);

    client1.beginRequest();
    client1.post("/v1/measurements");
    client1.sendHeader(HTTP_HEADER_CONTENT_TYPE, contentType);
    client1.sendHeader(HTTP_HEADER_CONTENT_LENGTH, postData.length());
    client1.sendHeader("Authorization", token);
    client1.endRequest();
    client1.print(postData);

    // read the status code and body of the response
    statusCode = client1.responseStatusCode();
    response = client1.responseBody();

    Serial.print("Status code: ");
    Serial.println(statusCode);
    Serial.print("Response: ");
    Serial.println(response);

    if (statusCode == 200) {
      Serial.println("Authorized");
      authorized = true;
    }
    else if (statusCode == 401) {
      Serial.println("Unauthorized");
      // Request to get the token
      String tokenJSON = httpRequest_login();
      JsonVariant root = jsonBuffer.parseObject(tokenJSON);
      // Test if parsing succeeds.
      if (!root.success()) {
        Serial.println("parseObject() failed");
        return;
      }
      // Fetch values
      token = root["token"].asString();
    }

    if (!client.connected()) {
      Serial.println();
      Serial.println("disconnecting from server.");
      client.stop();
    }
  }
}

String httpRequest_login() {

  int statusCode = 0;
  String response;

  // close any connection before send a new request.
  // This will free the socket on the Nina module
  client.stop();

  Serial.println("making login POST request");
  String contentType = "application/json";
  String postBody = "{\n";
  postBody += "\"username\": \"env-sensor-user-username\",";
  postBody += "\n\"password\": \"env-sensor-user-password\"";
  postBody += "\n}";
  Serial.println(postBody);

  client1.post("/v1/login", contentType, postBody);

  // read the status code and body of the response
  statusCode = client1.responseStatusCode();
  response = client1.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting from server.");
    client.stop();
  }
  return response;
}

long httpRequest_script(String& token) {

  bool authorized = false;
  int statusCode = 0;
  String response;
  long interval = -1;

  while (authorized == false) {
    // close any connection before send a new request.
    // This will free the socket on the Nina module
    client.stop();

    Serial.println("making GET request");

    client1.beginRequest();
    client1.get("/v1/scripts/air-quality-script");
    client1.sendHeader("Authorization", token);
    client1.endRequest();

    // read the status code and body of the response
    statusCode = client1.responseStatusCode();
    response = client1.responseBody();

    Serial.print("Status code: ");
    Serial.println(statusCode);
    Serial.print("Response: ");
    Serial.println(response);

    if (statusCode == 200) {
      Serial.println("Authorized");
      JsonVariant root = jsonBuffer.parseObject(response);
      // Test if parsing succeeds.
      if (!root.success()) {
        Serial.println("parseObject() failed");
        return interval;
      }
      // Fetch values
      String code = root["code"];
      root = jsonBuffer.parseObject(code);
      // Test if parsing succeeds.
      if (!root.success()) {
        Serial.println("parseObject() failed");
        return interval;
      }
      String intervalStr = root["interval"];
      interval = atol(intervalStr.c_str());
      authorized = true;
    }
    else if (statusCode == 401) {
      Serial.println("Unauthorized");
      // Request to get the token
      String tokenJSON = httpRequest_login();
      JsonVariant root = jsonBuffer.parseObject(tokenJSON);
      // Test if parsing succeeds.
      if (!root.success()) {
        Serial.println("parseObject() failed");
        return interval;
      }
      // Fetch values
      token = root["token"].asString();
    }

    if (!client.connected()) {
      Serial.println();
      Serial.println("disconnecting from server.");
      client.stop();
    }
  }
  return interval;
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
