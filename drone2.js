var arDrone = require('ar-drone');
var client = arDrone.createClient();


client.takeoff();

client
    .after(5000, function() {
//        this.clockwise(0.8);
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