var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
const opn = require('opn');
var config = require('./config');
var sys = require('util')
var exec = require('child_process').exec;

var app = module.exports = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers","*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
 });

///////////////////////////////////////////////////////
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
  connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var myResult="";
app.get('/client/:ip', function (req, res) {
  console.log("starting test");
  var child = exec("iperf3.exe -c "+req.params.ip, function (error, stdout, stderr) {
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

var serverCtrl = require('./serverCtrl');
// app.get('/api/test', serverCtrl.myTest);
app.post('/store', serverCtrl.storeResults);
app.get('/allResults', serverCtrl.getPastResults);

/////////////////////////GET IP//////////////////////////////

var thisIp=0;
var platform = process.platform;
console.log('platform: ', platform);
if(platform.indexOf("win32")>-1){
  var findIp = "ipconfig";
}
else{
  var findIp = "ifconfig";
}
var findThisIp = exec(findIp, function (error, stdout, stderr) {
  // console.log('Find Ip: ', stderr, stdout);
  thisIp=stdout;
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

var myIp="Couldn't Find IP Address";
function extractIp(str){
  var arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    var dots = arr[i].split(".");
    if(dots.length===4 && arr[i].indexOf(":")===-1 && arr[i] !== "127.0.0.1"){
      myIp = arr[i];
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
    console.log('myIp: ', myIp);
    clearInterval(this);
  }
  if(count>60){
    console.log('timed out');
    clearInterval(this);
  }
},500)


/////////////////////////////////////////////////////

app.get('/trigger', serverCtrl.startServer);

var port = config.PORT;
opn('http://localhost:'+port);

app.listen(port, function() {
  console.log('listening on port ', port);
});
