var altitude = $('div.altitude');

var takeoffBtn = $('button[data-drone="takeoff"]');
var landBtn = $('button[data-drone="land"]');
var upBtn = $('button[data-drone="up"]');
var downBtn = $('button[data-drone="down"]');
var flipBtn = $('button[data-drone="flip"]');
var spinClockwiseBtn = $('button[data-drone="spinCW"]');
var spinCounterClockwiseBtn = $('button[data-drone="spinCCW"]');


var socket = io.connect('http://localhost:3001');
socket.on('ack', function (data) {
  console.log(data);
});

[upBtn, downBtn, spinClockwiseBtn, spinCounterClockwiseBtn].forEach(function(btn) {
  console.log('stop');
  btn.mouseup(function() {
    socket.emit('drone-command', {
      command: 'stop'
    });
  })
});

takeoffBtn.click(function() {
  socket.emit('drone-command', {
    command: 'takeoff'
  });
});

landBtn.click(function() {
  socket.emit('drone-command', {
    command: 'land'
  });
});

upBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'up'
  });
});

downBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'down'
  });
});

flipBtn.click(function() {
  socket.emit('drone-command', {
    command: 'flip'
  });
});

spinClockwiseBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'spinCW'
  });
});

spinCounterClockwiseBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'spinCCW'
  });
});


socket.on('alt-data', function(data) {
  altitude.text(data);
});



