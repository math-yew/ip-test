
var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config');

var app = module.exports = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
  connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var serverCtrl = require('./serverCtrl');
app.get('/api/test', serverCtrl.myTest);

var port = config.PORT;
app.listen(port, function() {
  console.log('listening on port ', port);
});
