
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
  var now = moment().format("X");
  console.log(now)

$('#submit').on('click', function(){
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    trainUnix = moment(trainTime).format('X')
    frequency = $("#frequency").val().trim();
    result = now+trainUnix
    nextTrain = moment(result).format('hh:mm')

    console.log(name, destination, trainTime, frequency, nextTrain)
    database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        trainUnix: trainUnix,
        result: result,
        nextTrain: nextTrain
      });
    console.log(name, destination, trainTime, frequency)
})

database.ref().on("child_added", function(childSnapshot) {
    $('#tableOutput').append('<tr><td scope="col">' + childSnapshot.val().name + '</td>' 
    + '<td scope="col">' + childSnapshot.val().destination + '</td>'
    + '<td scope="col">' + childSnapshot.val().frequency + '</td>'
    + '<td scope="col">' + childSnapshot.val().nextTrain + '</td>'
    + '<td scope="col">' + waitTime + '</td>')
})

