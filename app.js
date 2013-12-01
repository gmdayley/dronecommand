var express = require('express'),
  app = express(),
  path = require('path'),
  server = require('http').createServer(app),
  wsCtrl = require('./ws-controller'),
  arClient = require('ar-drone').createClient();

var SPEED = 0.4;

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
  console.log('Stop');
  arClient.stop();
});

wsCtrl.on('up', function(data) {
  console.log('Up');
  arClient.up(SPEED);
});

wsCtrl.on('down', function(data) {
  console.log('Down');
  arClient.down(SPEED);
});

wsCtrl.on('front', function(data) {
  console.log('front');
  arClient.front(SPEED);
});

wsCtrl.on('back', function(data) {
  console.log('back');
  arClient.back(SPEED);
});

wsCtrl.on('left', function(data) {
  console.log('left');
  arClient.left(SPEED);
});

wsCtrl.on('right', function(data) {
  console.log('right');
  arClient.right(SPEED);
});

wsCtrl.on('spinCW', function(data) {
  console.log('spinCW');
  arClient.clockwise(SPEED);
});

wsCtrl.on('spinCCW', function(data) {
  console.log('spinCCW');
  arClient.counterClockwise(SPEED);
});

wsCtrl.on('flip', function(data) {
  console.log('Flip');
  arClient.animate('flipLeft', 500);
});


app.configure(function () {
  app.use(express.favicon());
  app.use(express.logger('dev'));
//  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', function(req, res) {
  res.sendfile("index.html");
});

require("dronestream").listen(server);
server.listen(3000);
