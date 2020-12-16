let express = require('express');
let app = express();

// To be able to parse req.body
app.use(express.json());

let fs = require("fs");

// Retrieve a list of teachers
app.get('/teachers', function (req, res) {
    console.log(`GET /teachers ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let teachers = JSON.parse(data).teachers;
        res.send(teachers);
    });
})

// Delete teacher #id
app.delete("/teachers/:id", function (req, res) {
    console.log(`DELETE /teachers/:id ${req.ip}`);
    let id = parseInt(req.params.id, 10);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data)

    // if (id < 0 || id >= length(data.teachers)) {
    //     res.status(204);
    //     res.send();
    // }
    data.teachers.splice(id, 1);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.status(204);
        res.send();
    });
})

// Create a new teacher
app.post('/teachers', function (req, res) {
    console.log(`POST /teachers ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);
    data.teachers.push(req.body.newTeacher);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.status(201);
        res.send();
    });
})

// Edit existing teacher
app.put('/teachers/:id', function (req, res) {
    console.log(`PUT /teachers ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);
    data.teachers[req.params.id] = req.body.teacher;
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.send();
    });
})


// Retrieves a list of activities
app.get('/activities', function (req, res) {
    console.log(`GET /activities ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let activities = JSON.parse(data).activities;
        console.log(activities);
        res.send(activities);
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})