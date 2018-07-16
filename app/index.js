// Import the messaging module
import document from "document";
import * as messaging from "messaging";

// UI objects
let actionButton1 = document.getElementById("actionButton1");
let actionButton2 = document.getElementById("actionButton2");
let actionButton3 = document.getElementById("actionButton3");
let status = document.getElementById("status");

// Request from the companion
function postAPI(actionId) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send an event to the companion
    messaging.peerSocket.send({
      actionId: actionId
    });
  }else{
    displayResult("readyState isn't OPEN");
  };
}

// Display the result received from the companion
function displayResult(message) {
  status.text = message;
}

// Button name
function setSettings(key, value){
  if (key == "actionName1"){
    actionButton1.text = value;
  }else if (key == "actionName2"){
    actionButton2.text = value;
  }else if (key == "actionName3"){
    actionButton3.text = value;
  }
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Post API when the connection opens
  displayResult("connection opens");
}

// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data.message) {
    displayResult(evt.data.message);
  }else if (evt.data.key && evt.data.value){
    let value = JSON.parse(evt.data.value).name;
    setSettings(evt.data.key, value);
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Click event
actionButton1.onclick = function(evt) {
  displayResult("Clicked: " + actionButton1.text);
  postAPI(1);
}
actionButton2.onclick = function(evt) {
  displayResult("Clicked: " + actionButton2.text);
  postAPI(2);
}
actionButton3.onclick = function(evt) {
  displayResult("Clicked: " + actionButton3.text);
  postAPI(3);
}

