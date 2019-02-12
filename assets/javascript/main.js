$(document).ready(function () {



    var config = {
        apiKey: "AIzaSyCxPk18Ju8ZAB9csA34kTDlJDjALuKyaF8",
        authDomain: "trains-f1788.firebaseapp.com",
        databaseURL: "https://trains-f1788.firebaseio.com",
        projectId: "trains-f1788",
        storageBucket: "",
        messagingSenderId: "823688505961"
    };
    firebase.initializeApp(config);
    // console.log(moment.local());
    var database = firebase.database();
    var trainName = "";
    var des = "";
    var time = moment().format("HH:mm");
    var frequency = moment().format("minutes");
    var away = "";
    var format = moment();
    // console.log(format);

    var timeNow = (moment(format).format("hh:mm a"));

    $("#timeNow").html(timeNow)

    $("#add").on("click", function (event) {
        event.preventDefault();

        trainName = $("#name-input").val().trim();
        des = $("#des-input").val().trim();
        time = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        away = $("#away-input").val();


        database.ref().push({

            trainName: trainName,
            des: des,
            time: time,
            frequency: frequency,


        })
        
    })
    database.ref().on("child_added", function (snapshot) {
        // console.log(timeNow);
        
    var a = moment(timeNow, "HH:mm");
    var b = moment(snapshot.val().time, "HH:mm");
    var firstOccurence = a.diff(b, 'minutes')
    // away = firstOccurence%(frequency)

    for(i = 0; i > firstOccurence.length; i++ ){
        i= frequency;
    
    // var a = moment(timeNow, "HH:mm");
    // var b = moment(snapshot.val().time, "HH:mm");
    // var firstOccurence = a.diff(b, 'minutes')
    away = firstOccurence%(frequency);

        console.log(i)
        
    }
        // console.log(snapshot.val().time);
        // console.log(snapshot.val().des);
        // console.log(snapshot.val().trainName);
        // console.log(snapshot.val().frequency);
        // console.log(snapshot.val().away);

        $("#trainName-display").text(snapshot.val().trainName);
        $("#des-display").text(snapshot.val().des);
        $("#time-display").text(snapshot.val().time);
        $("#frequency-display").text(snapshot.val().frequency);
        $("#away-input").text(snapshot.val().away);


        $("#trains").append(
            "<tr>" +
            "<td>" + snapshot.val().trainName + "</td>" +
            "<td>" + snapshot.val().des + "</td>" +
            "<td>" + snapshot.val().time + "</td>" +
            "<td>" + snapshot.val().frequency + "</td>" +
            "<td>" + firstOccurence + "</td>" +
            "</tr>")
            
    }, function (errorObject) {
        errorObject.code;
    });


});