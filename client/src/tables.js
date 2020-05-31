const gasses = ['CO', 'NO2', 'CH4'];
let authorization = '';
let pageCO = 1;
let pageNO2 = 1;
let pageCH4 = 1;
let totalPagesCO = 0;
let totalPagesNO2 = 0;
let totalPagesCH4 = 0;

// create the HTML elements needed for the menu
const menuHeading = document.createElement('h1');
const menu = document.createElement('div');
const DITENlogo = document.createElement('img');
const UNIGElogo = document.createElement('img');
const leftMenu = document.createElement('div');
const home = document.createElement('a');
const tables = document.createElement('a');
const charts = document.createElement('a');
const script = document.createElement('a');

// define innerHTML of menu's elements
menuHeading.innerHTML = 'Air Quality Monitor';
home.innerHTML = 'Home';
tables.innerHTML = 'Tabelle';
charts.innerHTML = 'Grafici';
script.innerHTML = 'Intervallo';

// add attributes to menu's HTML elements
menu.setAttribute('class', 'menu');
tables.setAttribute('class', 'active');
home.setAttribute('href', './index.html');
script.setAttribute('href', './script.html');
charts.setAttribute('href', './charts.html');
DITENlogo.setAttribute('src', './Immagini/diten.png');
DITENlogo.setAttribute('class', 'logo-diten');
UNIGElogo.setAttribute('class', 'logo-unige');
UNIGElogo.setAttribute('src', './Immagini/logo_unige.png');
leftMenu.setAttribute('class', 'menu-left');


// find the body element so that the newly created elements
// can be appended to it
const body = document.querySelector("body");

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


// This function creates a table for the corrispondent gas 
let createTable = function (gas, auth) {

    // GET request to know total pages' number
    getMeasObj(function (JSONobj) {
        if (gas == 'CO') {
            totalPagesCO = JSONobj.totalPages;
            console.log('Total pages CO: ' + totalPagesCO);
        }
        else if (gas == 'NO2') {
            totalPagesNO2 = JSONobj.totalPages;
            console.log('Total pages NO2: ' + totalPagesNO2);
        }
        else if (gas == 'CH4') {
            totalPagesCH4 = JSONobj.totalPages;
            console.log('Total pages CH4: ' + totalPagesCH4);
        }
    },
        auth, gas);

    // Create the HTML elements needed 
    const div = document.createElement("div");
    const table = document.createElement("div");
    const tableHeader = document.createElement("div");
    const headerRow = document.createElement("div");
    const headerCell1 = document.createElement("div");
    const headerCell2 = document.createElement("div");
    const headerCell3 = document.createElement("div");
    const tableBody = document.createElement("div");
    const bodyRow1 = document.createElement("div");
    const bodyRow2 = document.createElement("div");
    const bodyRow3 = document.createElement("div");
    const bodyRow4 = document.createElement("div");
    const bodyRow5 = document.createElement("div");
    const bodyRow6 = document.createElement("div");
    const bodyCell11 = document.createElement("div");
    const bodyCell12 = document.createElement("div");
    const bodyCell13 = document.createElement("div");
    const bodyCell21 = document.createElement("div");
    const bodyCell22 = document.createElement("div");
    const bodyCell23 = document.createElement("div");
    const bodyCell31 = document.createElement("div");
    const bodyCell32 = document.createElement("div");
    const bodyCell33 = document.createElement("div");
    const bodyCell41 = document.createElement("div");
    const bodyCell42 = document.createElement("div");
    const bodyCell43 = document.createElement("div");
    const bodyCell51 = document.createElement("div");
    const bodyCell52 = document.createElement("div");
    const bodyCell53 = document.createElement("div");
    const bodyCell61 = document.createElement("div");
    const bodyCell62 = document.createElement("div");
    const bodyCell63 = document.createElement("div");
    const tabTitle = document.createElement("p");


    // prova paginazione
    const paginationDiv = document.createElement('a');
    const aPrev = document.createElement('a');
    const aSucc = document.createElement('a');



    // Append the elements to the DOM

    // add the div to the body
    body.append(div);
    // add the title to the CO div
    div.append(tabTitle);
    // add the table to the body
    div.append(table);
    //add prev,next and page buttons to the body

    div.append(paginationDiv);
    paginationDiv.append(aPrev);
    aPrev.style.visibility = 'hidden';
    paginationDiv.append(aSucc);

    // add the header to the table
    table.append(tableHeader);
    // add the body to the table
    table.append(tableBody);
    // add a row to the table header
    tableHeader.append(headerRow);
    // add cell to the table header
    headerRow.append(headerCell1);
    headerRow.append(headerCell3);
    headerRow.append(headerCell2);
    // add rows to the table header
    tableBody.append(bodyRow1);
    tableBody.append(bodyRow2);
    tableBody.append(bodyRow3);
    tableBody.append(bodyRow4);
    tableBody.append(bodyRow5);
    tableBody.append(bodyRow6);
    // add cell to the table body's first raw
    bodyRow1.append(bodyCell11);
    bodyRow1.append(bodyCell13);
    bodyRow1.append(bodyCell12);
    // add cell to the table body's second raw
    bodyRow2.append(bodyCell21);
    bodyRow2.append(bodyCell23);
    bodyRow2.append(bodyCell22);
    // add cell to the table body's third raw
    bodyRow3.append(bodyCell31);
    bodyRow3.append(bodyCell33);
    bodyRow3.append(bodyCell32);
    // add cell to the table body's third raw
    bodyRow4.append(bodyCell41);
    bodyRow4.append(bodyCell43);
    bodyRow4.append(bodyCell42);
    // add cell to the table body's third raw
    bodyRow5.append(bodyCell51);
    bodyRow5.append(bodyCell53);
    bodyRow5.append(bodyCell52);
    // add cell to the table body's third raw
    bodyRow6.append(bodyCell61);
    bodyRow6.append(bodyCell63);
    bodyRow6.append(bodyCell62);


    // Use innerHTML to add text to header cell
    headerCell1.innerHTML = "Data Misurazione";
    headerCell3.innerHTML = "Orario Misurazione";
    headerCell2.innerHTML = "Concentrazione misurata [ppb]";
    bodyCell11.innerHTML = "Cell11";
    bodyCell12.innerHTML = "Cell12";
    bodyCell21.innerHTML = "Cell21";
    bodyCell22.innerHTML = "Cell22";
    bodyCell31.innerHTML = "Cell31";
    bodyCell32.innerHTML = "Cell32";
    bodyCell41.innerHTML = "Cell41";
    bodyCell42.innerHTML = "Cell42";
    bodyCell51.innerHTML = "Cell51";
    bodyCell52.innerHTML = "Cell52";
    bodyCell61.innerHTML = "Cell61";
    bodyCell62.innerHTML = "Cell62";
    tabTitle.innerHTML = "Tabella Misurazioni " + gas;
    aPrev.innerHTML = '&laquo';
    aSucc.innerHTML = '&raquo';


    // use setAttribute to add classes to divs
    div.setAttribute("class", "card-tables");
    table.setAttribute("class", "siimple-table siimple-table--striped siimple-table--border");
    tableHeader.setAttribute("class", "siimple-table-header");
    headerRow.setAttribute("class", "siimple-table-row");
    headerCell1.setAttribute("class", "siimple-table-cell body-cell");
    headerCell2.setAttribute("class", "siimple-table-cell body-cell");
    headerCell3.setAttribute("class", "siimple-table-cell body-cell");
    tableBody.setAttribute("class", "siimple-table-body");
    bodyRow1.setAttribute("class", "siimple-table-row");
    bodyRow2.setAttribute("class", "siimple-table-row");
    bodyRow3.setAttribute("class", "siimple-table-row");
    bodyRow4.setAttribute("class", "siimple-table-row");
    bodyRow5.setAttribute("class", "siimple-table-row");
    bodyRow6.setAttribute("class", "siimple-table-row");
    bodyCell11.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell12.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell13.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell21.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell22.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell23.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell31.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell32.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell33.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell41.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell42.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell43.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell51.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell52.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell53.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell61.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell62.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell63.setAttribute("class", "siimple-table-cell body-cell");
    bodyCell11.setAttribute('id', gas + 'bodyCell11');
    bodyCell12.setAttribute('id', gas + 'bodyCell12');
    bodyCell13.setAttribute('id', gas + 'bodyCell13');
    bodyCell21.setAttribute('id', gas + 'bodyCell21');
    bodyCell22.setAttribute('id', gas + 'bodyCell22');
    bodyCell23.setAttribute('id', gas + 'bodyCell23');
    bodyCell31.setAttribute('id', gas + 'bodyCell31');
    bodyCell32.setAttribute('id', gas + 'bodyCell32');
    bodyCell33.setAttribute('id', gas + 'bodyCell33');
    bodyCell41.setAttribute('id', gas + 'bodyCell41');
    bodyCell42.setAttribute('id', gas + 'bodyCell42');
    bodyCell43.setAttribute('id', gas + 'bodyCell43');
    bodyCell51.setAttribute('id', gas + 'bodyCell51');
    bodyCell52.setAttribute('id', gas + 'bodyCell52');
    bodyCell53.setAttribute('id', gas + 'bodyCell53');
    bodyCell61.setAttribute('id', gas + 'bodyCell61');
    bodyCell62.setAttribute('id', gas + 'bodyCell62');
    bodyCell63.setAttribute('id', gas + 'bodyCell63');
    tabTitle.setAttribute("class", "tab-title");
    paginationDiv.setAttribute('class', 'pagination');
    aPrev.setAttribute('id', gas + 'aprev');
    aSucc.setAttribute('id', gas + 'asucc');
    $('#' + gas + 'aprev').click(function () {
        if (gas == 'CO' && pageCO > 1)
            onClickPrev((pageCO - 1), gas, 'prev');
        else if (gas == 'NO2' && pageNO2 > 1)
            onClickPrev((pageNO2 - 1), gas, 'prev');
        else if (gas == 'CH4' && pageCH4 > 1)
            onClickPrev((pageCH4 - 1), gas, 'prev');
    });
    $('#' + gas + 'asucc').click(function () {
        if (gas == 'CO' && pageCO < totalPagesCO)
            onClickSucc((pageCO + 1), gas, 'succ');
        else if (gas == 'NO2' && pageNO2 < totalPagesNO2)
            onClickSucc((pageNO2 + 1), gas, 'succ');
        else if (gas == 'CH4' && pageCH4 < totalPagesCH4)
            onClickSucc((pageCH4 + 1), gas, 'succ');
    });



    getMeasObj(refreshTable, auth, gas);
}

// Set what to do when user clicks on prev button
let onClickPrev = function (clickedPage, gas) {
    if (gas == 'CO') {
        pageCO = clickedPage;
        console.log('Page CO is: ' + pageCO);
        getMeasObj(refreshTable, authorization, gas);
        if (pageCO == 1)
            document.getElementById('COaprev').style.visibility = 'hidden';
        if (pageCO == (totalPagesCO - 1))
            document.getElementById('COasucc').style.visibility = 'visible';
    }
    else if (gas == 'NO2') {
        pageNO2 = clickedPage;
        console.log('Page NO2 is: ' + pageNO2);
        getMeasObj(refreshTable, authorization, gas);
        if (pageNO2 == 1)
            document.getElementById('NO2aprev').style.visibility = 'hidden';
        if (pageNO2 == (totalPagesNO2 - 1))
            document.getElementById('NO2asucc').style.visibility = 'visible';
    }
    else if (gas == 'CH4') {
        pageCH4 = clickedPage;
        console.log('Page CH4 is: ' + pageCH4);
        getMeasObj(refreshTable, authorization, gas);
        if (pageCH4 == 1)
            document.getElementById('CH4aprev').style.visibility = 'hidden';
        if (pageCH4 == (totalPagesCH4 - 1))
            document.getElementById('CH4asucc').style.visibility = 'visible';
    }
}

// Set what to do when user clicks on prev button
let onClickSucc = function (clickedPage, gas) {
    if (gas == 'CO') {
        pageCO = clickedPage;
        console.log('Page CO is: ' + pageCO);
        getMeasObj(refreshTable, authorization, gas);
        if (pageCO == 2)
            document.getElementById('COaprev').style.visibility = 'visible';
        if (pageCO == totalPagesCO) {
            document.getElementById('COasucc').style.visibility = 'hidden';
            console.log('COasucc HIDDEN');
        }
    }
    else if (gas == 'NO2') {
        pageNO2 = clickedPage;
        console.log('Page NO2 is: ' + pageNO2);
        console.log('Total NO2 pages: ' + totalPagesNO2);
        getMeasObj(refreshTable, authorization, gas);
        if (pageNO2 == 2)
            document.getElementById('NO2aprev').style.visibility = 'visible';
        if (pageNO2 == totalPagesNO2) {
            document.getElementById('NO2asucc').style.visibility = 'hidden';
            console.log('NO2asucc HIDDEN');
        }
    }
    else if (gas == 'CH4') {
        pageCH4 = clickedPage;
        console.log('Page CH4 is: ' + pageCH4);
        getMeasObj(refreshTable, authorization, gas);
        if (pageCH4 == 2)
            document.getElementById('CH4aprev').style.visibility = 'visible';
        if (pageCH4 == totalPagesCH4) {
            document.getElementById('CH4asucc').style.visibility = 'hidden';
            console.log('CH4asucc HIDDEN');
        }
    }
}

let refreshTable = function (JSONobj, gas) {
    JSONobj.docs.forEach(function (data, i) {
        let date = new Date(data.startDate);
        let strDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        let hour = date.getHours();
        // console.log('Hour:' + hour);
        let minute = date.getMinutes();
        // console.log('Minute:' + minute);
        let time = hour + ':' + minute;
        // console.log('Time:' + time);

        if (i == 0) {
            (document.getElementById(gas + 'bodyCell11')).innerHTML = strDate;
            (document.getElementById(gas + 'bodyCell13')).innerHTML = time;
            (document.getElementById(gas + 'bodyCell12')).innerHTML = data.samples[0].values;
        }
        else if (i == 1) {
            (document.getElementById(gas + 'bodyCell21')).innerHTML = strDate;
            (document.getElementById(gas + 'bodyCell23')).innerHTML = time;
            (document.getElementById(gas + 'bodyCell22')).innerHTML = data.samples[0].values;
        }
        else if (i == 2) {
            (document.getElementById(gas + 'bodyCell31')).innerHTML = strDate;
            (document.getElementById(gas + 'bodyCell33')).innerHTML = time;
            (document.getElementById(gas + 'bodyCell32')).innerHTML = data.samples[0].values;
        }
        else if (i == 3) {
            (document.getElementById(gas + 'bodyCell41')).innerHTML = strDate;
            (document.getElementById(gas + 'bodyCell43')).innerHTML = time;
            (document.getElementById(gas + 'bodyCell42')).innerHTML = data.samples[0].values;
        }
        else if (i == 4) {
            (document.getElementById(gas + 'bodyCell51')).innerHTML = strDate;
            (document.getElementById(gas + 'bodyCell53')).innerHTML = time;
            (document.getElementById(gas + 'bodyCell52')).innerHTML = data.samples[0].values;
        }
        else if (i == 5) {
            (document.getElementById(gas + 'bodyCell61')).innerHTML = strDate;
            (document.getElementById(gas + 'bodyCell63')).innerHTML = time;
            (document.getElementById(gas + 'bodyCell62')).innerHTML = data.samples[0].values;
        }
    });
}

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

let getMeasObj = function (cb, auth, gas) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let text = this.responseText;
            let obj = JSON.parse(text);
            if (typeof cb === 'function') {
                cb(obj, gas);
            }
        }
        else if (this.readyState == 4 && this.status == 401) {
            login();
            getMeasObj(cb, authorization, gas);
        }
    };
    if (gas == 'CO') {
        xhttp.open("GET", "http://test.atmosphere.tools/v1/measurements?filter=%7B%22feature%22:%22CO%22%7D&limit=6&page=" + pageCO.toString(), false);
    }
    else if (gas == 'NO2') {
        xhttp.open("GET", "http://test.atmosphere.tools/v1/measurements?filter=%7B%22feature%22:%22NO2%22%7D&limit=6&page=" + pageNO2.toString(), false);
    }
    else if (gas == 'CH4') {
        xhttp.open("GET", "http://test.atmosphere.tools/v1/measurements?filter=%7B%22feature%22:%22CH4%22%7D&limit=6&page=" + pageCH4.toString(), false);
    }
    xhttp.setRequestHeader("username", "env-sensor-user-username");
    xhttp.setRequestHeader("password", "env-sensor-user-password");
    xhttp.setRequestHeader("Authorization", auth);
    xhttp.send();
}


// Create a table for each gas
gasses.forEach(gas => {
    createTable(gas, authorization);
});
