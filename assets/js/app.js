
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
  var nextTrain;
  var waitTime;
  var now = moment().format('HH:mm')

$('#submit').on('click', function(){
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = moment(trainTime, 'HH:mm').format('HH:mm')
    nextTrain;
    //compare current time vs. train time to see what time is greater (past v present)
    //if in the future will need to add time to get to the current time
    //if in the past will need just submit the first
    //{hours: var hours,minutes: var minutes}
    //figure out how many times interval can happen % 0 until current time
    //if section has a remainder then will need to go 1 interval past current time
    //wait time would just be the remainder
    if (moment(now).diff(firstTrain) < 0) {
      var nextTrain = firstTrain
    } else {
      var dif = moment(now).diff(firstTrain)
      if (frequency / dif % !0){
        var nextTrain = dif + frequency
        var waitTime = 0
      } else {
        var waitTime = frequency % dif
      }
    }

    

  
    database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        nextTrain: nextTrain,
        waitTime: waitTime,
      });
    //console.log(name, destination, trainTime, frequency)
})

database.ref().on("child_added", function(childSnapshot) {
    $('#tableOutput').append('<tr><td scope="col">' + childSnapshot.val().name + '</td>' 
    + '<td scope="col">' + childSnapshot.val().destination + '</td>'
    + '<td scope="col">' + childSnapshot.val().frequency + '</td>'
    + '<td scope="col">' + childSnapshot.val().nextTrain + '</td>'
    + '<td scope="col">' + childSnapshot.val().waitTime + '</td>')
})

