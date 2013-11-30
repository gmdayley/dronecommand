var express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  wsCtrl = require('./ws-controller'),
  arClient = require('ar-drone').createClient();

wsCtrl.start();

wsCtrl.on('takeoff', function(data){
  console.log('TakeOff');
  arClient.takeoff();
});

wsCtrl.on('land', function(data){
  console.log('Land');
  arClient.land();
});


wsCtrl.on('stop', function(data) {
  arClient.stop();
});

wsCtrl.on('up', function(data) {
  arClient.up(0.3);
});

wsCtrl.on('down', function(data) {
  arClient.down(0.3);
});

wsCtrl.on('flip', function(data) {
  arClient.animate('flipLeft', 1000);
});



app.configure(function () {
  app.use(express.favicon());
  app.use(express.logger('dev'));
//  app.use(app.router);
//  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', function(req, res) {
  res.sendfile("index4.html");
});

require("dronestream").listen(server);
server.listen(3000);
