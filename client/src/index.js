// create the HTML elements needed in index.html
const mainDiv = document.createElement('div');
const textDiv = document.createElement('div');
const circuit = document.createElement('img');
const menuHeading = document.createElement('h1');
const menu = document.createElement('div');
const DITENlogo = document.createElement('img');
const UNIGElogo = document.createElement('img');
const leftMenu = document.createElement('div');
const home = document.createElement('a');
const tables = document.createElement('a');
const charts = document.createElement('a');
const script = document.createElement('a');
const presentation = document.createElement('p');
const tablesDiv = document.createElement('div');
const tablesHeadDiv = document.createElement('div');
const tablesParDiv = document.createElement('div');
const chartsDiv = document.createElement('div');
const chartsHeadDiv = document.createElement('div');
const chartsParDiv = document.createElement('div');
const scriptDiv = document.createElement('div');
const scriptHeadDiv = document.createElement('div');
const scriptParDiv = document.createElement('div');


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

// add the main div to the body
body.append(mainDiv);
// add the heading's image to the div
//mainDiv.append(pageHeading);
// add the departement's heading to the div
mainDiv.append(circuit);
mainDiv.append(textDiv);
textDiv.append(presentation);
textDiv.append(tablesDiv);
tablesDiv.append(tablesHeadDiv);
tablesDiv.append(tablesParDiv);
textDiv.append(chartsDiv);
chartsDiv.append(chartsHeadDiv);
chartsDiv.append(chartsParDiv);
textDiv.append(scriptDiv);
scriptDiv.append(scriptHeadDiv);
scriptDiv.append(scriptParDiv);


// define innerHTML
menuHeading.innerHTML = 'Air Quality Monitor';
home.innerHTML = 'Home';
tables.innerHTML = 'Tabelle';
charts.innerHTML = 'Grafici';
script.innerHTML = 'Intervallo';
presentation.innerHTML = 'Attraverso questa applicazione web è possibile monitorare le quantità di Metano, Diossido di Azoto e Monossido di Carbonio, riferite ad un ambiente nel quale è stato installato il sistema di acquisizione dati (Arduino + Sensore Multicanale).<br>Oltre alla homepage, sono consultabili altre 3 pagine: Tabelle, Grafici ed Intervallo Rilevamenti.';
tablesHeadDiv.innerHTML = 'Tabelle';
tablesParDiv.innerHTML = ': vengono visualizzate 3 tabelle distinte, una per ciascun gas, all’interno delle quali vengono raggruppate le corrispondenti misurazioni, ciascuna accompagnata dalla data e dall’orario in cui è stata effettuata.';
chartsHeadDiv.innerHTML = 'Grafici';
chartsParDiv.innerHTML = ': vengono visualizzati 3 grafici distinti, uno per ciascun gas, al cui interno è tracciato l’andamento della concentrazione, in ppb, nel tempo. Sull’asse delle ascisse troviamo il riferimento temporale (data e ora di misurazione) mentre sulle ordinate la concentrazione misurata dal sensore.';
scriptHeadDiv.innerHTML = 'Intervallo';
scriptParDiv.innerHTML = ': è possibile visualizzare l’intervallo temporale, settato in precedenza dall’utente, tra due misurazioni consecutive. Inoltre da qui è possibile modificare tale intervallo attraverso gli specifici bottoni di selezione. ';

// use setAttribute to add attributes to HTML elements
mainDiv.setAttribute('class', 'card-main');
circuit.setAttribute('src', './Immagini/circuito_fisico.png');
circuit.setAttribute('class', 'circuit');
menu.setAttribute('class', 'menu');
DITENlogo.setAttribute('class', 'logo-diten');
DITENlogo.setAttribute('src', './Immagini/diten.png');
UNIGElogo.setAttribute('class', 'logo-unige');
UNIGElogo.setAttribute('src', './Immagini/logo_unige.png');
leftMenu.setAttribute('class', 'menu-left');
home.setAttribute('class', 'active');
tables.setAttribute('href', './tables.html');
script.setAttribute('href', './script.html');
charts.setAttribute('href', './charts.html');
presentation.setAttribute('class', 'presentation');
textDiv.setAttribute('class', 'card-text');
tablesParDiv.setAttribute('class', 'divPAR');
tablesHeadDiv.setAttribute('class', 'divHeadPAR');
chartsParDiv.setAttribute('class', 'divPAR');
chartsHeadDiv.setAttribute('class', 'divHeadPAR');
scriptParDiv.setAttribute('class', 'divPAR');
scriptHeadDiv.setAttribute('class', 'divHeadPAR');
tablesDiv.setAttribute('class', 'card-par');
chartsDiv.setAttribute('class', 'card-par');
scriptDiv.setAttribute('class', 'card-par');