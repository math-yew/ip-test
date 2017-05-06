var app = require('./ipTest.js');
var db = app.get('db');
var exec = require('child_process').exec;

var platform = process.platform;
console.log('platform: ', platform);
if(platform.indexOf("win32")>-1){
  var executeClient = "iperf3.exe -c "
  var findIp = "ipconfig";
  var executeServer = "iperf3.exe -s"
}
else{
  var executeClient = "./iperf3 -c "
  var findIp = "ifconfig";
  var executeServer = "./iperf3 -s"
}

module.exports = {

  getMyIp: function (req, res, next) {
    var thisIp=0;
    var findThisIp = exec(findIp, function (error, stdout, stderr) {
      thisIp=stdout;
      if (error !== null) {
        console.log('exec error: ' + error);
        return res.send(error);
      }
    });
    var myIp="Couldn't Find IP Address";
    function extractIp(str){
      var arr = str.split(" ");
      for (var i = 0; i < arr.length; i++) {
        var dots = arr[i].split(".");
        if(dots.length===4 && arr[i].indexOf(":")===-1 && arr[i] !== "127.0.0.1"){
          myIp = arr[i];
          return res.send(myIp);
          break;
        }
      }
    }
    var count=0;
    var watchIp = setInterval(function(){
      count++;
      console.log('waiting for ip: ',count);
      if(thisIp){
        extractIp(thisIp);
        clearInterval(this);
      }
      if(count>60){
        console.log('timed out');
        clearInterval(this);
      }
    },500);
  },

  startServer: function(req, res, next) {
    console.log('server started: ');
    var myResult;
    var child = exec(executeServer, function (error, stdout, stderr) {
      console.log('startServer: ', stderr, stdout);
      myResult = stdout;
      if (error !== null) {
        console.log('exec error: ' + error);
        return res.send(error);
      }
    });
    res.status(200).json(myResult);
  },

  startClient: function (req, res) {
    var reverseMode = "";
    if(req.query.reverse==="true" || req.query.reverse==="TRUE"){
      var reverseMode = " -R";

    }
    var myResult="";
    console.log("starting client");
    var child = exec(executeClient + req.params.ip + reverseMode, function (error, stdout, stderr) {
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
  },

  storeResults: function (req, res) {
    if(req.body.reverse){
      var receiver = req.body.thatComputer;
      var sender = req.body.thisComputer;
    }
    else{
      var receiver = req.body.thisComputer;
      var sender = req.body.thatComputer;
    }
    var date = new Date();
    var currentTime = date.toLocaleDateString() + " "+ date.toLocaleTimeString();
    db.new_result([sender,req.body.results[1][0],req.body.results[1][1],req.body.results[1][2],receiver,req.body.results[2][0],req.body.results[2][1],req.body.results[2][2], currentTime, req.body.thisConnection, req.body.thatConnection, req.body.reverse], function (err, results) {
      if(err){
        console.error(err);
        return res.send(err);
      }
      return res.send(results);
    })
  },

  getPastResults: function (req, res, next) {
    db.get_results([], function (err, results) {
      if(err){
        console.error(err);
        return res.send(err);
      }
      return res.send(results);
    })
  }

}
