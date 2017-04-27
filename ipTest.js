var express = require('express');
var bodyParser = require('body-parser');
var sys = require('util')
var exec = require('child_process').exec;

var app = express();
app.use(bodyParser.json());


  var myResult;
app.get('/trigger', function (req, res) {

  var child = exec("ls", function (error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    myResult = stdout;
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  console.log('myResult: ', myResult);
  res.status(200).json(myResult);
});

app.listen(3002, function() {
  console.log('Running on 3002');
});
