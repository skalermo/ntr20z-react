var express = require('express');
var app = express();
var fs = require("fs");

app.get('/teachers', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let teachers = JSON.parse(data).teachers;
        console.log(teachers);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(teachers);
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})