/*
 * T R A I N   T R A C K E R
 * A Train Tracking Experience  
 * Using Moment.js & Firebase
 * 
 * Jordan Boggs
 * (c) 2017 DU Coding Bootcamp
 */

 // Initialize Firebase
const config = {
  apiKey: "AIzaSyBY5dRNI8kTsHnfCFDTcXdLi2fqKdO5oJE",
  authDomain: "train-tracker-13a43.firebaseapp.com",
  databaseURL: "https://train-tracker-13a43.firebaseio.com",
  projectId: "train-tracker-13a43",
  storageBucket: "train-tracker-13a43.appspot.com",
  messagingSenderId: "418885638307"
};
firebase.initializeApp(config);

const database = firebase.database();
const ref = database.ref();

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
ref.on("child_added", function(snapshot) {
  let newChild = snapshot.val();
  let trainNameDisplay = newChild.trainName;
  let destinationDisplay = newChild.destination;
  let frequencyDisplay = newChild.frequency;
  let nextArrivalDisplay = newChild.nextArrival;
  let minutesAwayDisplay = newChild.minutesAway;

  $("#train-table").append(`
    <tr>
      <td>${trainNameDisplay}</td>
      <td>${destinationDisplay}</td>
      <td>${frequencyDisplay}</td>
      <td>${nextArrivalDisplay}</td>
      <td>${minutesAwayDisplay}</td>
    </tr>
  `);
});

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
  return nextArrival.format("DD MMM YYYY [at] h:mm A");
}

function calculateMinutes(start, freq) {
  let nextArrival = moment(start, "HH:mm").add(freq, 'm');
  do {
    nextArrival.add(freq, 'm');
  } while (nextArrival < moment())
  
  return nextArrival.diff(moment(), 'minutes');
}

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

  ref.push().set({
    "trainName": trainName,
    "destination": destination,
    "frequency": frequency,
    "firstTrain": firstTrain,
    "nextArrival": calculateArrival(firstTrain, frequency),
    "minutesAway": calculateMinutes(firstTrain, frequency)
  });
});

/* * * * *
 * Current Issues
 * 1. Times should update each time the page is loaded and each time
 *    the table is updated.
 * * * * */