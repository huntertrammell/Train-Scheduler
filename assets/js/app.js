
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
  var now = moment()

$('#submit').on('click', function(){
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();
    nextTrain = moment(trainTime, 'HH:mm').add(frequency, 'm').format('HH:mm')
    waitCalc = moment(now, 'HH:mm').subtract(nextTrain, 'HH:mm').format('HH:mm')
    waitTime = moment.duration(waitCalc, 'HH:mm').asMinutes()
    //cannot figure out how to equate repeating intervals to make it repeat every 15 minutes
    //have next train time set, but it just adds 15 mintes onto time
    //have wait until next train steup but it doesnt actualy do anything
    
    console.log(trainTime)
    console.log(frequency)
    console.log(nextTrain)
    console.log(waitTime)
    console.log(now)

  
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

