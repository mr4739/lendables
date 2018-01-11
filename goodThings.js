var globalTimer;
var elNetID;
var elItem;

document.addEventListener('DOMContentLoaded', function (e) {

    document.getElementById('scan').addEventListener('click', scan);
    document.getElementById('searchId').addEventListener('click', search);
    document.getElementById('returnItem').addEventListener('click', returnItem);

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
});

function showMenu() {
    document.getElementById("options").className = "menu-on";
}

function hideMenu() {
    document.getElementById("options").className = "menu-off";
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