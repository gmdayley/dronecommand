var arDrone = require('ar-drone');
var client = arDrone.createClient();

var http = require("http"),
    drone = require("dronestream");

var server = http.createServer(function(req, res) {
    require("fs").createReadStream(__dirname + "/index2.html").pipe(res);
});

drone.listen(server);
server.listen(5555);

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



