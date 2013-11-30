var events = require('events');
var emitter = new events.EventEmitter();

var app = require('http').createServer(function(req, res) {
  // nothing yet
});

var io = require('socket.io').listen(app),
    fs = require('fs');

io.sockets.on('connection', function(socket) {
  socket.emit('ack', {});

  socket.on('drone-command', function(data) {
    emitter.emit(data.command);
  });
});


exports.start = function(port) {
  app.listen(port || 3001);
};

exports.on = function(str, cb) {
  emitter.on(str, cb);
};

