function getFormData(which = "cForm") {
    var elements = document.getElementById(which).elements; // all form elements
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
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        var rowData = data[i];
                        var row = document.createElement("div");
                        for (var j = 0; j < data[i].length; j++) {
                            var temp = document.createElement("div");
                            if (j == 0) {
                                var d = new Date(Date.parse(rowData[j]));
                                rowData[j] = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                            }
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
    if (intentString == "lending") {
        xhr.send(encoded + "&intent=" + intentString + "&Returned=false");
    } else {
        xhr.send(encoded + "&intent=" + intentString);
    }
}

function currentItems() {
    document.getElementById("form-container").style.display = "block";
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url + "?intent=currItems");
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
    document.getElementById("form-container").style.display = "block";
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";    
    xhr.open('GET', url + "?intent=getLog");
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

function getStats() {
    document.getElementById("form-container").style.display = "none";
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";    
    xhr.open('GET', url + "?intent=getStats");
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

function getArchive() {
    var intentString;
    var xhr = new XMLHttpRequest();
    var notifEl = document.getElementById("notif");
    notifEl.style.backgroundColor = "#4CAF50";
    notifEl.innerHTML = "Successfully submitted"
    notifEl.style.display = 'block';
    clearTimeout(globalTimer);
    globalTimer = setTimeout(hideNotif, 3000);
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("intent=archive");
}

function handleAlumForm(e) {
    event.preventDefault();
    var formElements = document.getElementById("aForm").elements;
    if (formElements["Name"].value != "" && formElements["NetID"].value != "") {
        intentString = "genAlumCode";
    } else if (formElements["abarcode"].value != "") {
        intentString = "checkInAlum";
    } else if (formElements["bbarcode"].value != "") {
        intentString = "getAlumInfo";
    }
    var intentString;
    var data = getFormData("aForm");
    var url = event.target.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
            var tmp = xhr.responseText;
            if (tmp) {
                clearBody();
                tmp = JSON.parse(tmp);
                var data = JSON.parse(tmp.data);
                if (intentString == "checkInAlum" || intentString == "getAlumInfo") {
                    for (var i = 0; i < data.length; i++){
                        var rowData = data[i];
                        var row = document.createElement("div");
                        for (var j = 1; j < data[i].length; j++) {
                            var temp = document.createElement("div");
                            if (j == 3) {
                                var d = new Date(Date.parse(rowData[j]));
                                rowData[j] = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                            }
                            temp.innerHTML = rowData[j];
                            temp.className += "rowCell";
                            row.appendChild(temp);
                        }
                        row.className += "row";
                        document.getElementById("infos").appendChild(row);
                    }
                } else {
                    document.getElementById("infos").textContent = data;
                }
                clearAlumForm();
                return;
            }
    };
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    var aName = document.getElementById("inputAlumName").value;
    var aNetID = document.getElementById("inputAlumNetID").value;
    var aExpire = document.getElementById("inputExpire").value;
    var aBarcode = document.getElementById("checkAlum").value;
    var bBarcode = document.getElementById("infoAlum").value;
    if (aName != "" && aNetID != "") {
        xhr.send(encoded + "&intent=" + "genAlumCode");
    }
    else if (aBarcode != "") {
        xhr.send(encoded + "&intent=" + "checkInAlum");
    }
    else {
        xhr.send(encoded + "&intent=" + "getAlumInfo");
    }
}

function clearAlumForm() {
    document.getElementById("inputAlumName").value = "";
    document.getElementById("inputAlumNetID").value = "";
    document.getElementById("inputExpire").value = "";
    document.getElementById("checkAlum").value = "";
    document.getElementById("infoAlum").value = "";
}

document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById('cForm').addEventListener("submit", handleFormSubmit, false);
    document.getElementById('viewLog').addEventListener("click", getLog);
    document.getElementById('archive').addEventListener("click", getArchive);
    document.getElementById('stats').addEventListener("click", getStats);
    document.getElementById('aForm').addEventListener("submit", handleAlumForm, false);
}, false);
