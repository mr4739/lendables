var globalTimer;

document.addEventListener('DOMContentLoaded', function (e) {

    document.getElementById('scan').addEventListener('click', scan);
    document.getElementById('searchId').addEventListener('click', search);
    document.getElementById('returnItem').addEventListener('click', returnItem);

    //form validation
    var inNetID = document.getElementById("inputNetID");
    inNetID.maxLength = 6;
    inNetID.pattern = "[a-zA-Z0-9]+";

    var inItem = document.getElementById("inputItem");

    //timer
    globalTimer = setTimeout(hideNotif, 3000);
    clearTimeout(globalTimer);
});

function hideNotif() {
    document.getElementById("notif").style.display = "none";
}

function scan() {
    document.getElementById("inputNetID").style.display = "block";
    document.getElementById("inputItem").style.display = "block";
}

function returnItem() {
    document.getElementById("inputNetID").style.display = "none";
    document.getElementById("inputItem").style.display = "block";
}

function search() {
    document.getElementById("inputItem").style.display = "none";
    document.getElementById("inputNetID").style.display = "block";
}