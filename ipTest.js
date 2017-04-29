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

///////////////////////////////////////////////////////
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
  connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var serverCtrl = require('./serverCtrl');
app.get('/api/test', serverCtrl.myTest);

/////////////////////////GET IP//////////////////////////////
var thisIp=0;
var findThisIp = exec("ifconfig en1 inet", function (error, stdout, stderr) {
  console.log('stdout: ', stdout);
  console.log('stderr: ', stderr);
  thisIp=stdout;
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
// console.log('thisIp.stdout: ', thisIp.stdout);

// for (var i=0;i<10;i++) {
//   console.log("pre",i);
//   timingOut(i);
//   if(thisIp){
//     console.log('arrived: ', thisIp);
//     break;
//   }
// }
//
// function timingOut(i){
//     setTimeout(function () {
//     console.log(i,thisIp);
//     i++
//   }, i*1000);
// }
var myIp="";
function extractIp(str){
  var arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    var dots = arr[i].split(".");

    if(dots.length===4){
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
    console.log('thisIp: ', thisIp);
    clearInterval(this);
  }
  if(count>6){
    console.log('timed out');
    clearInterval(this);
  }
},500)


///////////////////////////////////////////////////////

var myResult;
app.get('/trigger', serverCtrl.startServer);

var port = config.PORT;
opn('http://localhost:'+port);

app.listen(port, function() {
  console.log('listening on port ', port);
});
