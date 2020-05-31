let authorization = '';
let COchartValues = [];
let NO2chartValues = [];
let CH4chartValues = [];
const gasses = ['CO', 'NO2', 'CH4'];

// create the HTML elements needed in charts.html
const menuHeading = document.createElement('h1');
const menu = document.createElement('div');
const DITENlogo = document.createElement('img');
const UNIGElogo = document.createElement('img');
const home = document.createElement('a');
const tables = document.createElement('a');
const charts = document.createElement('a');
const script = document.createElement('a');
const leftMenu = document.createElement('div');
const COtitleDiv = document.createElement('div');
const NO2titleDiv = document.createElement('div');
const CH4titleDiv = document.createElement('div');
const COchartDiv = document.createElement('div');
const NO2chartDiv = document.createElement('div');
const CH4chartDiv = document.createElement('div');
const COchartTitle = document.createElement('h1');
const NO2chartTitle = document.createElement('h1');
const CH4chartTitle = document.createElement('h1');


// find the body element so that the newly created elements
// can be appended to it
const body = document.querySelector('body');


// append elements to the DOM

// add the menu to the body
body.append(menu);
menu.append(leftMenu);
menu.append(menuHeading);
leftMenu.append(home);
leftMenu.append(tables);
leftMenu.append(charts);
leftMenu.append(script);
menu.append(DITENlogo);
menu.append(UNIGElogo);
body.append(COtitleDiv);
COtitleDiv.append(COchartTitle);
COtitleDiv.append(COchartDiv);
body.append(NO2titleDiv);
NO2titleDiv.append(NO2chartTitle);
NO2titleDiv.append(NO2chartDiv);
body.append(CH4titleDiv);
CH4titleDiv.append(CH4chartTitle);
CH4titleDiv.append(CH4chartDiv);


// define innerHTML
menuHeading.innerHTML = 'Air Quality Monitor';
home.innerHTML = 'Home';
tables.innerHTML = 'Tabelle';
charts.innerHTML = 'Grafici';
script.innerHTML = 'Intervallo';
COchartTitle.innerHTML = 'Concentrazione di CO nel tempo';
NO2chartTitle.innerHTML = 'Concentrazione di NO2 nel tempo';
CH4chartTitle.innerHTML = 'Concentrazione di CH4 nel tempo';


// use setAttribute to add attributes to HTML elements
menu.setAttribute('class', 'menu');
charts.setAttribute('class', 'active');
tables.setAttribute('href', './tables.html');
script.setAttribute('href', './script.html');
home.setAttribute('href', './index.html');
DITENlogo.setAttribute('src', './Immagini/diten.png');
DITENlogo.setAttribute('class', 'logo-diten');
UNIGElogo.setAttribute('class', 'logo-unige');
UNIGElogo.setAttribute('src', './Immagini/logo_unige.png');
leftMenu.setAttribute('class', 'menu-left');
COchartTitle.setAttribute("class", "tab-title");
NO2chartTitle.setAttribute("class", "tab-title");
CH4chartTitle.setAttribute("class", "tab-title");
COtitleDiv.setAttribute('class', 'chart-title-div');
CH4titleDiv.setAttribute('class', 'chart-title-div');
NO2titleDiv.setAttribute('class', 'chart-title-div');


// Load Charts and the corechart package.
google.charts.load('current', { packages: ['corechart'] });


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

let loadValues = function (gas, auth) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let text = this.responseText;
            let measurements = JSON.parse(text).docs;

            measurements.forEach(data => {
                if (gas == 'CO') {
                    let value = parseFloat(data.samples[0].values);
                    let date = new Date(data.startDate);
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    if (hours.lenght < 2)
                        hours = '0' + date.getHours();
                    if (minutes.lenght < 2)
                        minutes = '0' + data.getMinutes();

                    let time = hours + ':' + minutes;
                    let strDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '\n' + time;
                    COchartValues.push([strDate, value]);
                }
                else if (gas == 'NO2') {
                    let value = parseFloat(data.samples[0].values);
                    let date = new Date(data.startDate);
                    let hours;
                    let minutes;
                    if (date.getHours().lenght < 2)
                        hours = '0' + String(date.getHours());
                    else
                        hours = date.getHours();
                    if (date.getMinutes().lenght < 2)
                        minutes = '0' + String(date.getMinutes());
                    else
                        minutes = date.getMinutes();

                    let time = hours + ':' + minutes;
                    let strDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '\n' + time;
                    NO2chartValues.push([strDate, value]);
                }
                else if (gas == 'CH4') {
                    let value = parseFloat(data.samples[0].values);
                    let date = new Date(data.startDate);
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    if (hours.lenght < 2)
                        hours = '0' + date.getHours();
                    if (minutes.lenght < 2)
                        minutes = '0' + data.getMinutes();

                    let time = hours + ':' + minutes;
                    let strDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '\n' + time;
                    CH4chartValues.push([strDate, value]);
                }
            });
        }
        else if (this.readyState == 4 && this.status == 401) {
            login();
            loadValues(gas, authorization);
        }
    };
    if (gas == 'CO') {
        xhttp.open("GET", "http://test.atmosphere.tools/v1/measurements?filter=%7B%22feature%22:%22CO%22%7D", false);
    }
    else if (gas == 'NO2') {
        xhttp.open("GET", "http://test.atmosphere.tools/v1/measurements?filter=%7B%22feature%22:%22NO2%22%7D", false);
    }
    else if (gas == 'CH4') {
        xhttp.open("GET", "http://test.atmosphere.tools/v1/measurements?filter=%7B%22feature%22:%22CH4%22%7D", false);
    }
    xhttp.setRequestHeader("username", "env-sensor-user-username");
    xhttp.setRequestHeader("password", "env-sensor-user-password");
    xhttp.setRequestHeader("Authorization", auth);
    xhttp.send();
}

let COdrawChart = function () {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Concentration');
    COchartValues.reverse();
    console.log('CO Array: ' + COchartValues);
    data.addRows(COchartValues);

    // Set chart options
    var options = {
        title: 'Variazione Concentrazione di CO nel tempo',
        vAxis: {
            title: 'Concentrazione [ppb]'
        },
        hAxis: {
            title: 'Data della Rilevazione'
        },
        titlePosition: 'none',
        height: 500
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.LineChart(COchartDiv);
    chart.draw(data, options);
}

let NO2drawChart = function () {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Concentration');
    NO2chartValues.reverse();
    NO2chartValues.forEach(element => console.log(element));
    console.log('NO2 Array: ' + NO2chartValues);
    data.addRows(NO2chartValues);

    // Set chart options
    var options = {
        title: 'Variazione Concentrazione di NO2 nel tempo',
        vAxis: {
            title: 'Concentrazione [ppb]'
        },
        hAxis: {
            title: 'Data della Rilevazione'
        },
        titlePosition: 'none',
        height: 500
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.LineChart(NO2chartDiv);
    chart.draw(data, options);
}

let CH4drawChart = function () {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Concentration');
    CH4chartValues.reverse();
    console.log('CH4 Array: ' + CH4chartValues);
    data.addRows(CH4chartValues);

    // Set chart options
    var options = {
        title: 'Variazione Concentrazione di CH4 nel tempo',
        vAxis: {
            title: 'Concentrazione [ppb]'
        },
        hAxis: {
            title: 'Data della Rilevazione'
        },
        titlePosition: 'none',
        height: 500
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.LineChart(CH4chartDiv);
    chart.draw(data, options);
}

gasses.forEach(gas => {
    loadValues(gas, authorization);
});

// call drawChart when Google Chart library get loaded completely
google.charts.setOnLoadCallback(COdrawChart);
google.charts.setOnLoadCallback(NO2drawChart);
google.charts.setOnLoadCallback(CH4drawChart);
