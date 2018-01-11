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
    if (formElements["netID"].value == "" && formElements["Item"].value == "") {
        notifEl.style.backgroundColor = "";
        notifEl.innerHTML = "Error, invalid fields"
        notifEl.style.display = 'block';
        return;
    }
    var intentString;
    var notifEl = document.getElementById("notif");
    var data = getFormData(); // get the values submitted in the form
    var url = event.target.action; //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (formElements["netID"].value == "#f44336") {
                // console.log("no netId");
                intentString = "search";
            } else if (formElements["Item"].value == "") {
                // console.log("no item");
                intentString = "return";
            } else {
                intentString = "lending";
            }

            // Clears form input
            formElements["Item"].value = "";
            formElements["netID"].value = "";
            // Show successful
            notifEl.style.backgroundColor = "#4CAF50";
            notifEl.innerHTML = "Successfully submitted"
            notifEl.style.display = 'block';
            return;
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded + "&intent=" + intentString);
}

function getLog() {
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        var tmp = xhr.responseText;
        if (tmp) {
            var node = document.getElementById("infos");
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var result = JSON.parse(tmp);
            var data = JSON.parse(result.data);
            for (var i = 0; i < data.length; i++) {
                var rowData = data[i];
                var row = document.createElement("div");
                for (var j = 0; j < rowData.length; j++) {
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
    xhr.send();
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

document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById('cForm').addEventListener("submit", handleFormSubmit, false);
    document.getElementById('scan').addEventListener('click', scan);
    document.getElementById('viewLog').addEventListener('click', getLog);
    document.getElementById('searchId').addEventListener('click', search);
    document.getElementById('returnItem').addEventListener('click', returnItem);
}, false);
