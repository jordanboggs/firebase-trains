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
function formSubmit() {

}

/*
 * Function that calculates next arrival and time until next arrival
 * 
 * We'll definitely need moment.js for this
 */
function calculateTimes(firstTime, ) {

}

 /*
 * Function that pulls data to add to table (#train-table)
 * 
 * We'll have to parse time data using moment.js, I think
 */

