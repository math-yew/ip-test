var app = require('./ipTest.js');
var db = app.get('db');
var exec = require('child_process').exec;
module.exports = {
  myTest: function (req, res) {
    db.database_call([], function (err, results) {
      if(err){
        return res.send(err);
      }
      return res.send(results);
    })
  },

  startServer: function(req, res) {
    var myResult;
    // var child = exec("ls", function (error, stdout, stderr) {
    var child = exec("./iperf3 -s", function (error, stdout, stderr) {
      console.log('startServer: ', stderr, stdout);
      myResult = stdout;
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
    console.log('myResult: ', myResult);
    res.status(200).json(myResult);
  },

  storeResults: function (req, res) {
    var currentTime=new Date();
    console.log('currentTime: ', currentTime);
  db.new_result(["1",req.body.results[1][0],req.body.results[1][1],req.body.results[1][2],"2",req.body.results[2][0],req.body.results[2][1],req.body.results[2][2], currentTime, "Other", "Other", false], function (err, results) {
    if(err){
      console.error(err);
      return res.send(err);
    }
    return res.send(results);
  })
  }

}
