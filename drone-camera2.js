var http = require("http"),
    drone = require("dronestream");


var server = http.createServer(function(req, res) {
    require("fs").createReadStream(__dirname + "/index2.html").pipe(res);
});

drone.listen(server);
server.listen(5555);