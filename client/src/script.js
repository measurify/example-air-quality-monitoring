// This variable will contain the authorization's token
let authorization = '';

// create the HTML elements needed in mod_script.html
const mainDiv = document.createElement('div');
const menuHeading = document.createElement('h1');
const menu = document.createElement('div');
const DITENlogo = document.createElement('img');
const UNIGElogo = document.createElement('img');
const home = document.createElement('a');
const tables = document.createElement('a');
const charts = document.createElement('a');
const script = document.createElement('a');
const leftMenu = document.createElement('div');
const description = document.createElement('h2');
const intervalForm = document.createElement('form');
const selectHours = document.createElement('select');
const selectMinutes = document.createElement('select');
const setButton = document.createElement('button');
let arrayHoursOptions = [];
let arrayMinutesOptions = [];

// find the body element so that the newly created elements
// can be appended to it
const body = document.querySelector('body');


// append elements to the DOM
body.append(menu);
menu.append(leftMenu);
menu.append(menuHeading);
leftMenu.append(home);
leftMenu.append(tables);
leftMenu.append(charts);
leftMenu.append(script);
menu.append(DITENlogo);
menu.append(UNIGElogo);
body.append(mainDiv);
mainDiv.append(description);
mainDiv.append(intervalForm);
intervalForm.append(selectHours);
intervalForm.append(selectMinutes);
mainDiv.append(setButton);

// Create selects' options
for (let i = 0; i < 25; i++) {
    arrayHoursOptions[i] = document.createElement('option');
    selectHours.append(arrayHoursOptions[i]);
    if (i < 10)
        arrayHoursOptions[i].innerHTML = '0' + (i).toString();
    else
        arrayHoursOptions[i].innerHTML = (i).toString();
    arrayHoursOptions[i].setAttribute('value', i);
}
for (let i = 0; i < 60; i++) {
    // Add "append" to selectMinutes
    arrayMinutesOptions[i] = document.createElement('option');
    selectMinutes.append(arrayMinutesOptions[i]);
    if (i < 10)
        arrayMinutesOptions[i].innerHTML = '0' + (i).toString();
    else
        arrayMinutesOptions[i].innerHTML = (i).toString();
    arrayMinutesOptions[i].setAttribute('value', i);
}


// define innerHTML
menuHeading.innerHTML = 'Air Quality Monitor';
home.innerHTML = 'Home';
tables.innerHTML = 'Tabelle';
charts.innerHTML = 'Grafici';
script.innerHTML = 'Intervallo';
description.innerHTML = 'Inserisci l\'intervallo di tempo che separa due misure consecutive';
setButton.innerHTML = 'Invia';

// use setAttribute to add attributes to HTML elements
mainDiv.setAttribute('class', 'card-main');
menu.setAttribute('class', 'menu');
script.setAttribute('class', 'active');
home.setAttribute('href', './index.html');
charts.setAttribute('href', './charts.html');
tables.setAttribute('href', './tables.html');
leftMenu.setAttribute('class', 'menu-left');
DITENlogo.setAttribute('src', './Immagini/diten.png');
DITENlogo.setAttribute('class', 'logo-diten');
UNIGElogo.setAttribute('class', 'logo-unige');
UNIGElogo.setAttribute('src', './Immagini/logo_unige.png');
selectHours.setAttribute('class', 'siimple-select');
selectMinutes.setAttribute('class', 'siimple-select select-minutes');
setButton.setAttribute('onclick', 'updateInterval()');
setButton.setAttribute('class', 'siimple-btn set-button');


// This method is used to receive the authorization token 
let login = function () {
    var xhttp = new XMLHttpRequest();
    var body = '{\n"username" : "env-sensor-user-username",\n"password" : "env-sensor-user-password"\n}';

    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tokenText = this.responseText;
            let tokenObj = JSON.parse(tokenText);
            console.log(tokenObj.token);
            authorization = tokenObj.token;
        }
    };
    xhttp.open("POST", "http://students.atmosphere.tools/v1/login", false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(body);
}

// Da modificare
let displayInterval = function (auth) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let responseObj = JSON.parse(response);
            let code = responseObj.code;
            let codeObj = JSON.parse(code);
            let millis = codeObj.interval;
            let hours = Math.floor(millis / 3600000);
            millis -= hours * 3600000;
            let minutes = Math.floor(millis / 60000);
            for (let i, j = 0; i = selectHours.options[j]; j++) {
                if (i.value == hours) {
                    selectHours.selectedIndex = j;
                    break;
                }
            }
            for (let i, j = 0; i = selectMinutes.options[j]; j++) {
                if (i.value == minutes) {
                    selectMinutes.selectedIndex = j;
                    break;
                }
            }
            console.log('Status 200, Displayed Interval: ' + codeObj.interval);
        }
        else if (this.readyState == 4 && this.status == 401) {
            console.log('Status 401, redo displayInterval');
            login();
            displayInterval(authorization);
        }
        else {
            console.error(this.responseText);
        }
    };
    xhttp.open('GET', 'http://students.atmosphere.tools/v1/scripts/air-quality-script', false);
    xhttp.setRequestHeader('username', 'env-sensor-user-username');
    xhttp.setRequestHeader('password', 'env-sensor-user-password');
    xhttp.setRequestHeader('Authorization', auth);
    xhttp.send();
}

let updateInterval = function (auth) {
    let hours = selectHours.options[selectHours.selectedIndex].value;
    let minutes = selectMinutes.options[selectMinutes.selectedIndex].value;
    let millis = (hours * 3600000) + (minutes * 60000);
    let body = '{"code": "{\\"interval\\":' + millis + '}"}';
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log('Status code: ' + this.status);
        if (this.readyState == 4 && this.status == 200) {
            console.log('Status 200, Updated Interval:\n' + this.responseText);
        }
        else if (this.readyState == 4 && this.status == 401) {
            console.log('Status 401, redo updateInterval');
            login();
            updateInterval(authorization);
        }
        else {
            console.error(this.responseText);
        }
    };
    xhttp.open("PUT", "http://students.atmosphere.tools/v1/scripts/air-quality-script", false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader("username", "env-sensor-user-username");
    xhttp.setRequestHeader("password", "env-sensor-user-password");
    xhttp.setRequestHeader("Authorization", auth);
    xhttp.send(body);
}

// Display interval value
displayInterval(authorization);

