var globalTimer;

document.addEventListener('DOMContentLoaded', function (e) {
    //form validation
    var inNetID = document.getElementById("inputNetID");
    inNetID.minLength = 2;
    inNetID.maxLength = 6;
    inNetID.pattern = "[a-zA-Z0-9]+";
    
    var inItem = document.getElementById("inputItem");
    inItem.minLength = 1;

    //timer
    globalTimer = setTimeout(hideNotif, 3000);
    clearTimeout(globalTimer);
});

function hideNotif() {
    document.getElementById("notif").style.display = "none";
}