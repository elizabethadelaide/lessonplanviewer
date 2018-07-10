// server.js
// where your node app starts

// init project
var express = require('express');
//var argon2i = require('argon2-ffi');
var app = express();

var user = "";


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/homework.html", function (request, response) {
  response.sendFile(__dirname + '/views/homework.html');
});

app.get("/cad.html", function (request, response) {
  response.sendFile(__dirname + '/views/cad.html');
});

/*crypto.randomBytes(16, function(err, salt) {
  if (err) throw err;
  argon2i.hash(process.env.PASSWORD, salt, function(err, hash){
    if (err) throw err;
     user = hash;
     //res.sendStatus(201);
     console.log(user);
  });
});*/

var spreadsheetID = process.env.SECRET;
var request = require("request")
 // Make sure it is public or set to Anyone with link can view
 var url = "https://docs.google.com/spreadsheets/d/e/"+spreadsheetID+"/pub?gid=0&single=true&output=csv";
const csv=require('csvtojson');

csv()
.fromStream(request.get(url))
.on('end_parsed', function(jsonArrayObj){
    console.log(jsonArrayObj);
  app.get("/jsonbody", (request, response) => {
    response.send(jsonArrayObj);
  });
    
})

var url = "https://docs.google.com/spreadsheets/d/e/" + spreadsheetID + "/pub?gid=1538478797&single=true&output=csv";

csv()
.fromStream(request.get(url))
.on('end_parsed', function(jsonArrayObj){
    console.log(jsonArrayObj);
    for (var i = 0; i < jsonArrayObj.length; i++){
          delete jsonArrayObj[i]['ID'];
          delete jsonArrayObj[i]['Topic'];
    }
  app.get("/detailsJson", (request, response) => {
    response.send(jsonArrayObj);
});
    
})

var url = "https://docs.google.com/spreadsheets/d/e/" + spreadsheetID + "/pub?gid=1751970917&single=true&output=csv"

csv()
.fromStream(request.get(url))
.on('end_parsed', function(jsonArrayObj){
    console.log(jsonArrayObj);
    for (var i = 0; i < jsonArrayObj.length; i++){
          delete jsonArrayObj[i]['ID'];
          delete jsonArrayObj[i]['Topic'];
    }
  app.get("/homeworkJson", (request, response) => {
    response.send(jsonArrayObj);
});
    
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

