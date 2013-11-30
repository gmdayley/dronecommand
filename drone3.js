var app = require('http').createServer(handler)
    , fs = require('fs')
    , client = require('ar-drone').createClient()
    , drone = require("dronestream");


function handler (req, res) {
    require("fs").createReadStream(__dirname + "/index2.html").pipe(res);
}

drone.listen(app);
app.listen(5555);



var app2 = require('http').createServer(handler)
    , io = require('socket.io').listen(app2);

app2.listen(8090);


io.sockets.on('connection', function (socket) {
    socket.on('launch', function (data) {
        launch();
    });
});


var inflight = false;

function launch(){
    if(!inflight){
        inflight = true;
        client.takeoff();
        client
            .after(5000, function() {
                this.up(0.2);
            })
            .after(3000, function() {
                this.animate('flipLeft', 15);
            })
            .after(1000, function() {
                this.stop();
            })
            .after(2000, function() {
                this.land();
            });
    }
    inflight = false;
}


