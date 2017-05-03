var express = require('express');
var bodyParser = require('body-parser');
var sys = require('util')
var exec = require('child_process').exec;

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers","*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
 });


  var myResult="";
app.get('/client', function (req, res) {
  console.log("starting test");
  var child = exec("iperf3.exe -c 192.168.0.7", function (error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    myResult = stdout;
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  var count=0;
  var watchResults = setInterval(function(){
    count++;
    console.log('waiting for results: ',count);
    if(myResult){
      console.log('myResult: ', myResult);
      clearInterval(this);
      res.status(200).json(myResult);
    }
    if(count>120){
      console.log('timed out');
      clearInterval(this);
      res.status(400).json('Timed out');
    }
  },500)

});

app.listen(3002, function() {
  console.log('Running on 3002');
});
