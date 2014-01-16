var events = require('events');
var emitter = new events.EventEmitter();

var app = require('http').createServer();

var io = require('socket.io').listen(app),
    fs = require('fs');

io.set('log level', 1);
io.sockets.on('connection', function(socket) {
  socket.emit('ack', {});

  socket.on('drone-command', function(data) {
    emitter.emit(data.command);
  });
});

module.exports = {
  start:  function(port) {
    app.listen(port || 3001);
  },

  on: function(str, cb) {
    emitter.on(str, cb);
  },

  data: function(data) {
    io.sockets.emit('drone-data', data);
  }
};
