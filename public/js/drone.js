var altitude = $('div.altitude');
var battery = $('div.battery');

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

socket.on('drone-data', function(data) {
//  console.log(data);
  altitude.text(data.demo.altitude.toFixed(2) + ' m');
  battery.text(data.demo.batteryPercentage.toFixed(2) + '%');
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

tweetBtn.click(function(e) {
  console.log($('#droneStream').find('canvas')[0].toDataURL("image/png"));
  // TODO: Implement
});


$(document).keyup(function(e) {
  _keyDown[e.keyCode] = false;

  switch(e.keyCode) {
    case 37:
    case 38:
    case 39:
    case 40:
    case 65:
    case 68:
    case 83:
    case 87:
      socket.emit('drone-command', {
        command: 'stop'
     });
  }
});

var _isOn = false;
var _keyDown = {};

$(document).keydown(function(e) {
//  console.log(e.keyCode);

  if(!_keyDown[e.keyCode]) {
    _keyDown[e.keyCode] = true;

    switch(e.keyCode) {
      case 13:
        socket.emit('drone-command', {
          command: 'disableEmergency'
        });
        break;
      case 16:
        socket.emit('drone-command', {
          command: 'flip'
        });
        break;
      case 32:
        socket.emit('drone-command', {
          command: (_isOn)? 'takeoff' : 'land'
        });
        _isOn = !(_isOn);
        break;
      case 37:
        socket.emit('drone-command', {
          command: 'left'
        });
        break;
      case 38:
        socket.emit('drone-command', {
          command: 'front'
        });
        break;
      case 39:
        socket.emit('drone-command', {
          command: 'right'
        });
        break;
      case 40:
        socket.emit('drone-command', {
          command: 'back'
        });
        break;
      case 65:
        socket.emit('drone-command', {
          command: 'spinCW'
        });
        break;
      case 68:
        socket.emit('drone-command', {
          command: 'spinCCW'
        });
        break;
      case 70:
        socket.emit('drone-command', {
          command: 'fireLeft'
        });
        break;
      case 72:
        $('div.help').toggleClass('show');
        break;
      case 74:
        socket.emit('drone-command', {
          command: 'fireRight'
        });
        break;
      case 83:
        socket.emit('drone-command', {
          command: 'down'
        });
        break;
      case 87:
        socket.emit('drone-command', {
          command: 'up'
        });
        break;
      default:
    }
  }
});


