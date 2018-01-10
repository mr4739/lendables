function getFormData() {
    var elements = document.getElementById("cForm").elements; // all form elements
    var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function (k) {
        data[k] = elements[k].value.trim().toLowerCase();
    });
    return data;
}

function handleFormSubmit(event) {
    event.preventDefault();
    var data = getFormData(); // get the values submitted in the form
    var url = event.target.action; //
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        // Clears form input
        var formElements = document.getElementById("cForm").elements;
        formElements["Item"].value = "";
        formElements["netID"].value = "";
        for (el in formElements) {
            //
        }
        // Show successful
        var notifEl = document.getElementById("notif");
        notifEl.innerHTML = "Successfully submitted"
        notifEl.style.display = 'block';
        
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
}

function closeNotif() {
    document.getElementById("notifClose").style.display = "none";
}

function getLog() {
    console.log("hello");
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
    }
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById('cForm').addEventListener("submit", handleFormSubmit, false);
    document.getElementById('notifClose').addEventListener('click', closeNotif);
    document.getElementById('viewLog').addEventListener('click', getLog);
}, false);
