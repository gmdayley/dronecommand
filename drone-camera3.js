var express = require('express')
  , app = express()
  , path = require('path')
  , server = require("http").createServer(app)
  ;

var app2 = require('http').createServer(handler)
  , io = require('socket.io').listen(app2)
  , fs = require('fs');

app2.listen(3001);

function handler (req, res) {
  /*fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });*/

  res.send('ok');
}

var arDrone = require('ar-drone');
var drone = arDrone.createClient();


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('takeoff', function (data) {
    console.log(data);
    drone.takeoff();
  });

  socket.on('land', function (data) {
    console.log(data);

    drone.land();
  });

   socket.on('up', function(data) {

     drone
     .after(100, function() {
     this.up(0.2)
     })
     .after(1000, function() {
     this.stop();
     })

   });


  socket.on('flip', function(data) {

    drone.animate('flipLeft', 1000);
  })
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
  res.sendfile("index3.html");
});

/*
 * Important:
 *
 * pass in the server object to listen, not the express app
 * call 'listen' on the server, not the express app
 */
require("dronestream").listen(server);
server.listen(3000);