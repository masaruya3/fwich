// Import the messaging module
import * as messaging from "messaging";
import { settingsStorage } from "settings";

// URLs
let url1;
let url2;
let url3;

// Apply settings
function applySettings(){
  // Get the value of the setting
  let actionName1 = settingsStorage.getItem("actionName1");
  returnSettings("actionName1", actionName1);
  let actionName2 = settingsStorage.getItem("actionName2");
  returnSettings("actionName2", actionName2);
  let actionName3 = settingsStorage.getItem("actionName3");
  returnSettings("actionName3", actionName3);
  url1 = JSON.parse(settingsStorage.getItem("url1")).name;
  url2 = JSON.parse(settingsStorage.getItem("url2")).name;
  url3 = JSON.parse(settingsStorage.getItem("url3")).name;
}

// Request
function request(actionId) {
  let url;
  if (actionId == 1){
    url = url1;
  }else if (actionId == 2){
    url = url2;
  }else if (actionId == 3){
    url = url3
  }
  fetch(url)
  .then(function (response) {
      returnResult("request send");
  })
  .catch(function (err) {
    returnResult(event + " failed");
    console.log("Error posting: " + err);
  });
}

// Send result to the device
function returnResult(result) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN){
    messaging.peerSocket.send({message: result});
  }else{
    console.log("failed");
  }
}

// Send settings app
function returnSettings(key, value){
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN){
    messaging.peerSocket.send({key: key, value: value});
  }else{
    console.log("failed");
  }
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  applySettings(); 
}

// Listen for messages from the device
messaging.peerSocket.onmessage = function(evt) {
  request(evt.data.actionId);
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Event fires when a setting is changed
settingsStorage.onchange = function(evt) {
  returnSettings(evt.key, evt.newValue);
}