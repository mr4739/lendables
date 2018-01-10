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

function getLog() {
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/a/nyu.edu/macros/s/AKfycbws7Z3d7J8cyjZq2SWkQT6ip4aZMMzGRsTsllxvslvakFaiNMdx/exec";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        var tmp = xhr.responseText;
        if (tmp){
            var node = document.getElementById("infos");
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var result = JSON.parse(tmp);
            var data = JSON.parse(result.data);
            for (var i = 0; i <  data.length; i++){
                var rowData = data[i];
                var row = document.createElement("div");
                for (var j = 0; j < rowData.length; j++) {
                    var temp = document.createElement("div");
                    temp.innerHTML=rowData[j];
                    row.appendChild(temp);
                }
                document.getElementById("infos").appendChild(row);
            }
        }
    }
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById('cForm').addEventListener("submit", handleFormSubmit, false);
    document.getElementById('viewLog').addEventListener('click', getLog);
}, false);
