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
    var formElements = document.getElementById("cForm").elements;
    var notifEl = document.getElementById("notif");
    if (formElements["netID"].value == "" && formElements["Item"].value == "") {
        notifEl.style.backgroundColor = "#f44336";
        notifEl.innerHTML = "Error, invalid fields"
        notifEl.style.display = 'block';
        clearTimeout(globalTimer);
        globalTimer = setTimeout(hideNotif, 3000);
        return;
    }
    if (formElements["netID"].value == "") {
        intentString = "return";
    } else if (formElements["Item"].value == "") {
        intentString = "search";
    } else {
        intentString = "lending";
    }

    var intentString;
    var data = getFormData(); // get the values submitted in the form
    var url = event.target.action; //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // Clears form input
            formElements["Item"].value = "";
            formElements["netID"].value = "";
            // Show successful
            notifEl.style.backgroundColor = "#4CAF50";
            notifEl.innerHTML = "Successfully submitted"
            notifEl.style.display = 'block';

            clearTimeout(globalTimer);
            globalTimer = setTimeout(hideNotif, 3000);

            if (intentString == "search" || intentString == "return") {
                var tmp = xhr.responseText;
                if (tmp) {
                    clearBody();
                    var result = JSON.parse(tmp);
                    var data = JSON.parse(result.data);
                    for (var i = 0; i < data.length; i++) {
                        var rowData = data[i];
                        var row = document.createElement("div");
                        for (var j = 0; j < data[i].length; j++) {
                            var temp = document.createElement("div");
                            //bad practice but date is first element in array
                            if (j == 0) {
                                var d = new Date(Date.parse(rowData[j]));
                                rowData[j] = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                            }
                            //time is second element in array
                            else if (j == 1) {
                                rowData[j] = formatAMPM(new Date(Date.parse(rowData[j])));
                            }
                            temp.innerHTML = rowData[j];
                            temp.className += "rowCell"
                            row.appendChild(temp);
                        }
                        row.className += "row";
                        document.getElementById("infos").appendChild(row);
                    }
                }
            }
            return;
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function (k) {
        if (data[k]) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    }).join('&')
    //console.log(encoded + "&intent=" + intentString);
    if (intentString == "lending") {
        xhr.send(encoded + "&intent=" + intentString + "&Returned=false");
    } else {
        xhr.send(encoded + "&intent=" + intentString);
    }
}

function currentItems() {
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        var tmp = xhr.responseText;
        if (tmp) {
            clearBody();
            var result = JSON.parse(tmp);
            var data = JSON.parse(result.data);
            for (var i = 0; i < data.length; i++) {
                var rowData = data[data.length - i - 1];
                if (rowData[rowData.length - 1] == "FALSE") {
                    var row = document.createElement("div");
                    for (var j = 0; j < data[i].length; j++) {
                        var temp = document.createElement("div");
                        temp.innerHTML = rowData[j];
                        temp.className += "rowCell"
                        row.appendChild(temp);
                    }
                    row.className += "row";
                    document.getElementById("infos").appendChild(row);
                }
            }
        }
        return;
    }
    xhr.send();
}

function getLog() {
    console.log("getting recent log");
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        var tmp = xhr.responseText;
        if (tmp) {
            clearBody();
            var result = JSON.parse(tmp);
            var data = JSON.parse(result.data);
            for (var i = 0; i < data.length && i < 8; i++) {
                var rowData = data[data.length - i - 1];
                var row = document.createElement("div");
                for (var j = 0; j < data[i].length; j++) {
                    var temp = document.createElement("div");
                    temp.innerHTML = rowData[j];
                    temp.className += "rowCell"
                    row.appendChild(temp);
                }
                row.className += "row";
                document.getElementById("infos").appendChild(row);
            }
        }
        return;
    }
    xhr.send();
}

function getArchive() {
    console.log("getting archive");
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        var tmp = xhr.responseText;
        if (tmp) {
            clearBody();
            var result = JSON.parse(tmp);
            var data = JSON.parse(result.data);
            for (var i = 0; i < data.length; i++) {
                var rowData = data[data.length - i - 1];
                var row = document.createElement("div");
                for (var j = 0; j < data[i].length; j++) {
                    var temp = document.createElement("div");
                    temp.innerHTML = rowData[j];
                    temp.className += "rowCell"
                    row.appendChild(temp);
                }
                row.className += "row";
                document.getElementById("infos").appendChild(row);
            }
        }
        return;
    }
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById('cForm').addEventListener("submit", handleFormSubmit, false);
    document.getElementById('viewLog').addEventListener("click", getLog);
    document.getElementById('archive').addEventListener("click", getArchive);
}, false);