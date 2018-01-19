
//execute by method=POST
//use intent to specify function calls
function doPost(e) {
    try {
      if (e.parameters["intent"] == "lending") {
        record_data(e);
        return ContentService
            .createTextOutput(
            JSON.stringify({
                "result": "success",
                "data": JSON.stringify(e.parameters)
            }))
            .setMimeType(ContentService.MimeType.JSON);
      } else if (e.parameters["intent"] == "search") {
        return ContentService
            .createTextOutput(
            JSON.stringify({
                "result": "success",
                "data": JSON.stringify(search(e.parameters["netID"],2,false))
            }))
            .setMimeType(ContentService.MimeType.JSON);
      } else if (e.parameters["intent"] == "return") {
        return ContentService
            .createTextOutput(
            JSON.stringify({
                "result": "success",
                "data": JSON.stringify(search(e.parameters["Item"],3,true))
            }))
            .setMimeType(ContentService.MimeType.JSON);
      } else if (e.parameters["intent"] == "archive") {
        return ContentService
            .createTextOutput(
            JSON.stringify({
                "result": "success",
                "data": JSON.stringify(getArchive())
            }))
            .setMimeType(ContentService.MimeType.JSON);
      }
      
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({
                "result": "error",
                "error": e
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// returns data entire sheet
function doGet(e) {
  var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
  var sheet = doc.getSheetByName('record');
  var nextRow = sheet.getLastRow();
  var recentRange;
  var dataReturn;
  if (sheet.getLastRow() == 1) {
      dataReturn = [];
  } else {
    recentRange = sheet.getRange(2, 1, sheet.getLastRow()-1, 5);
    dataReturn = recentRange.getDisplayValues();
  }
  return ContentService
            .createTextOutput(
            JSON.stringify({
                "result": "success",
                "data": JSON.stringify(dataReturn)
            }))
            .setMimeType(ContentService.MimeType.JSON);
}

// thing, string, search element
// column, int, column to search
// isReturned, boolean, get elements that are returned if true
function search(thing, column, isReturned) {
  var result = [];
  var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
  var sheet = doc.getSheetByName('record');
  var data = sheet.getDataRange().getValues();
  //var data = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    //if (data[i][column] == thing && isReturned ^ !data[i][4]) {
    if (data[i][column] == thing && !data[i][4]) {
      if (isReturned) {
        sheet.getRange(i+1,5).setValue("TRUE");
        data = sheet.getDataRange().getValues();
      }
      result.push(data[i]);
    }
  }
  return result;
}

var SCRIPT_PROP = PropertiesService.getScriptProperties();

//only run once to setup script with google sheets
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}

//records data into spreadsheet
function record_data(e) {
    try {
        var d = new Date();
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
        var sheet = doc.getSheetByName('record');
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1;
        var row = [(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()];
        row.push(formatAMPM(d));
        for (var i = 2; i < headers.length; i++) {
            if (headers[i].length > 0) {
                if (e.parameter[headers[i]]) {
                    row.push(e.parameter[headers[i]]);
                }
            }
        }
        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    } catch (error) {
        Logger.log(e);
    } finally {
        return;
    }
}

//bad name, it actually just archives the "record" sheet into the "archive" sheet for returned items
function getArchive() {
  var source = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('record');
  var target = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('archive');
  if (source.getLastRow() > 1) {
    for (var i = 2; i < source.getLastRow()+1; ++i) {
      if (source.getRange(i,5).getValue()) {
        source.getRange(i,1,1,5).copyTo(target.getRange(target.getLastRow()+1,1,1,5),{contentsOnly:true});
        source.deleteRow(i);
        i = i-1;
      }
    }
  }
}

//formats time into AM and PM string from Date object
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
