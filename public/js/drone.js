var altitude = $('div.altitude');

var takeoffBtn = $('button[data-drone="takeoff"]');
var landBtn = $('button[data-drone="land"]');
var upBtn = $('button[data-drone="up"]');
var downBtn = $('button[data-drone="down"]');
var frontBtn = $('button[data-drone="front"]');
var backBtn = $('button[data-drone="back"]');
var leftBtn = $('button[data-drone="left"]');
var rightBtn = $('button[data-drone="right"]');
var flipBtn = $('button[data-drone="flip"]');
var disEmergencyBtn = $('button[data-drone="disableEmergency"]');
var spinClockwiseBtn = $('button[data-drone="spinCW"]');
var spinCounterClockwiseBtn = $('button[data-drone="spinCCW"]');
var tweetBtn = $('button[data-drone="tweet"]');


var socket = io.connect('http://localhost:3001');
socket.on('ack', function (data) {
  console.log(data);
});

[upBtn, downBtn, frontBtn, backBtn, leftBtn, rightBtn, spinClockwiseBtn, spinCounterClockwiseBtn].forEach(function(btn) {
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

disEmergencyBtn.click(function() {
  socket.emit('drone-command', {
    command: 'disableEmergency'
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

frontBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'front'
  });
});

backBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'back'
  });
});

leftBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'left'
  });
});

rightBtn.mousedown(function() {
  socket.emit('drone-command', {
    command: 'right'
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

socket.on('drone-data', function(data) {
//  console.log(data);
  altitude.text(data.demo.altitude);
//  altitude.text(data.demo.batteryPercentage);
});

tweetBtn.click(function(e){
  console.log($('#droneStream').find('canvas')[0].toDataURL("image/png"));
  // TODO: Implement
});


