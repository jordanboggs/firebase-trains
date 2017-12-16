/*
 * T R A I N   T R A C K E R
 * A Train Tracking Experience  
 * Using Moment.js & Firebase
 * 
 * Jordan Boggs
 * (c) 2017 DU Coding Bootcamp
 */

var trainArray = JSON.parse(localStorage.getItem("trainArray"));
if (!Array.isArray(trainArray)) {
  trainArray = [];
}

/*
 * Function that calculates next arrival and time until next arrival
 * 
 * We'll definitely need moment.js for this
 * Parse as HH:mm for 24-hour time
 * e.g., moment(start, "HH:mm");
 * 
 * You can add time with the .add() method
 * e.g., moment(start, "HH:mm").add(freq, 'm');
 */
function calculateArrival(start, freq) {
  let nextArrival = moment(start, "HH:mm").add(freq, 'm');
  do {
    nextArrival.add(freq, 'm');
  } while (nextArrival < moment())
  return nextArrival.format("DD MMM, YYYY [at] h:mm A");
}

function calculateMinutes(start, freq) {
  let nextArrival = moment(start, "HH:mm").add(freq, 'm');
  do {
    nextArrival.add(freq, 'm');
  } while (nextArrival < moment())
  
  return nextArrival.toNow();
}

 /*
 * Function that pulls data to add to table (#train-table)
 * 
 * We'll have to parse time data using moment.js, I think
 */
function drawTable() {
  // Reset the table
  $("#train-table").html(`
    <caption>Current Train Schedule</caption>
    <tr>
      <th>Train Name</th>
      <th>Destination</th>
      <th>Frequency (min)</th>
      <th>Next Arrival</th>
      <th>Minutes Away</th>
    </tr>
  `);

  for (let index=0; index < trainArray.length; index++) {
    let current = trainArray[index];
    $("#train-table").append(`
      <tr>
        <td>${current.trainName}</td>
        <td>${current.destination}</td>
        <td>${current.frequency}</td>
        <td>${current.nextArrival}</td>
        <td>${current.minutesAway}</td>
      </tr>
    `);
  }
}

/*
 * Function to draw train info on page load
 */
$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBY5dRNI8kTsHnfCFDTcXdLi2fqKdO5oJE",
    authDomain: "train-tracker-13a43.firebaseapp.com",
    databaseURL: "https://train-tracker-13a43.firebaseio.com",
    projectId: "train-tracker-13a43",
    storageBucket: "train-tracker-13a43.appspot.com",
    messagingSenderId: "418885638307"
  };
  firebase.initializeApp(config);
});

/* 
 * Function to add train info to wherever we're saving it
 * 
 * Form id is #add-train
 * Train name is #train-name
 * Destination is #destination
 * Frequency is #frequency
 * First train time is #first-train-time
 * 
 * For now, let's save everything to local storage
 * 
 * We will also want to validate the data in some way
 */ 
$(document).on("click", "#submit-button", function(event) {
  event.preventDefault();
  let trainName = $("#train-name").val().trim();
  let destination = $("#destination").val().trim();
  let frequency = $("#frequency").val().trim();
  let firstTrain = $("#first-train-time").val().trim();

  trainArray.push({
    "trainName": trainName,
    "destination": destination,
    "frequency": frequency,
    "firstTrain": firstTrain,
    "nextArrival": calculateArrival(firstTrain, frequency),
    "minutesAway": calculateMinutes(firstTrain, frequency)
  });
  localStorage.setItem("trainArray", JSON.stringify(trainArray));
  drawTable();
});

/* * * * *
 * Current Issues
 * 1. Integrate with Firebase
 * 2. Times should update each time the page is loaded and each time
 *    the table is updated.
 * * * * */