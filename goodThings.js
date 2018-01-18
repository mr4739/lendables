var globalTimer;
var elNetID;
var elItem;

document.addEventListener('DOMContentLoaded', function (e) {

    //form validation
    var inNetID = document.getElementById("inputNetID");
    inNetID.maxLength = 6;
    inNetID.pattern = "[a-zA-Z0-9]+";

    var inItem = document.getElementById("inputItem");
    document.getElementById("options").className = "menu-off";
    document.getElementById("menuClose").addEventListener("click", hideMenu, false);

    document.getElementById("menuIcon").addEventListener("click", showMenu, false);
    var allButts = document.getElementsByClassName("opt");
    for (var i = 0; i < allButts.length; i++) {
        allButts[i].addEventListener("click", hideMenu);
    }

    elNetID = document.getElementById("inputNetID");
    elItem = document.getElementById("inputItem");

    //timer
    globalTimer = setTimeout(hideNotif, 3000);
    clearTimeout(globalTimer);

    document.getElementById('scan').addEventListener('click', scan);
    document.getElementById('searchId').addEventListener('click', search);
    document.getElementById('returnItem').addEventListener('click', returnItem);
    document.getElementById('currItem').addEventListener('click', currentItems);
    document.getElementById('aboutInfo').addEventListener('click', showAbout);
});

function showMenu() {
    document.getElementById("options").className = "menu-on";
}

function hideMenu() {
    document.getElementById("options").className = "menu-off";
    clearBody();
}
function hideNotif() {
    document.getElementById("notif").style.display = "none";
}

function scan() {
    elNetID.style.display = "block";
    elItem.style.display = "block";
}

function returnItem() {
    elNetID.style.display = "none";
    elNetID.value = "";
    elItem.style.display = "block";
}

function search() {
    elItem.style.display = "none";
    elItem.value = "";
    elNetID.style.display = "block";
}

function clearBody() {
    var node = document.getElementById("infos");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function showAbout() {
    var aboutEl = document.createElement("div");
    aboutEl.innerHTML = 'NYU LaGuardia Co-op<br><img src="lenda.png"><br>version 1.0.1<br>https://github.com/stcnyu/';
    aboutEl.style.textAlign = "left";
    aboutEl.style.lineHeight = 1.5;
    aboutEl.style.width = "24em";
    aboutEl.style.margin = "auto";
    aboutEl.style.fontSize = "0.8em";
    document.getElementById("infos").appendChild(aboutEl);
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
