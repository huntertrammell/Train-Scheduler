
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_CGhEwKTkZG6xH7SJEj-g6qdJyPv-AcQ",
    authDomain: "train-scheduler-71736.firebaseapp.com",
    databaseURL: "https://train-scheduler-71736.firebaseio.com",
    projectId: "train-scheduler-71736",
    storageBucket: "train-scheduler-71736.appspot.com",
    messagingSenderId: "1088636400343"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var name = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";

$('#submit').on('click', function(){
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();
    //compare current time vs. train time to see what time is greater (past v present)
    //if in the future will need to add time to get to the current time
    //if in the past will need just submit the first
    //figure out how many times interval can happen % 0 until current time
    //if section has a remainder then will need to go 1 interval past current time
    //wait time would just be the remainder
  
    //push values from form to firebase
    database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
      });
    //clear form
    name = $("#name").val('');
    destination = $("#destination").val('');
    trainTime = $("#trainTime").val('');
    frequency = $("#frequency").val('');
})

database.ref().on("child_added", function(childSnapshot) {
    //pull variables from firebase to push to doc
    //can pull from above function and append on this, but value will be constant from time of creation
    //since pulling data on child added, whenever page is refreshed the functions run again to determine actual time difference
    name = childSnapshot.val().name
    destination = childSnapshot.val().destination
    trainTime = childSnapshot.val().trainTime
    frequency = childSnapshot.val().frequency

    // First Time (pushed back 1 year to make sure it comes before current time - found this out the hard way)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    //check for remainder
    var timeRemainder = diffTime % frequency;

     //show minutes until next train
    var waitTime = frequency - timeRemainder;

    //arrival time of next train
    var nextArrival = moment().add(waitTime, "minutes");
    var nextTrain = moment(nextArrival).format("HH:mm");

    //push data to table
    $('#tableOutput').append(
    '<tr><td scope="col">' + name + '</td>' 
    + '<td scope="col">' + destination + '</td>'
    + '<td scope="col">' + frequency + '</td>'
    + '<td scope="col">' + nextTrain + '</td>'
    + '<td scope="col">' + waitTime + '</td>')
})

