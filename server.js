var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static('static'));

var profile = {
    port: 3000,
    life: 10000
};


app.get('/', function (req, res) {
    res.status(200).send("Get");
});

var port = process.env.PORT || profile.port;
server.listen(port, function () {
    console.log("Listening on 3000");
});