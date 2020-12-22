let express = require('express');
let app = express();

// To be able to parse req.body
app.use(express.json());

let fs = require("fs");

// Retrieve a list of teachers
// Exclude teachers used in provided slot
// Include teacher used in provided activity
app.get('/teachers', function (req, res) {
    console.log(`GET /teachers ${req.ip}`);
    let activityId = parseInt(req.query.includeForActivity, 10);
    let slot = parseInt(req.query.excludeForSlot, 10);
    fs.readFile(__dirname + "/" + "data.json", function (err, json) {
        let data = JSON.parse(json);
        let activity = data.activities[activityId];
        let teachers = data.teachers.filter(
            t => (
                (t === (activity && activity.teacher)) ||
                !(data.activities.filter(a => a.slot === slot).map(a => a.teacher).includes(t))
            )
        );
        console.log(teachers);
        res.send(teachers);
    });
})

// Delete teacher #id
app.delete("/teachers/:id", function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`DELETE /teachers/${req.params.id} ${req.ip}`);
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
    let id = parseInt(req.params.id, 10);
    console.log(`PUT /teachers/${id} ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);
    data.teachers[id] = req.body.teacher;
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.send();
    });
})


// Retrieves a list of rooms
// Exclude rooms used in provided slot
// Include room used in provided activity
app.get('/rooms', function (req, res) {
    console.log(`GET /rooms ${req.ip}`);
    let activityId = parseInt(req.query.includeForActivity, 10);
    let slot = parseInt(req.query.excludeForSlot, 10);
    fs.readFile(__dirname + "/" + "data.json", function (err, json) {
        let data = JSON.parse(json);
        let activity = data.activities[activityId];
        let rooms = data.rooms.filter(
            r => (
                (r === (activity && activity.room)) ||
                !(data.activities.filter(a => a.slot === slot).map(a => a.room).includes(r))
            )
        )
        console.log(rooms);
        res.send(rooms);
    });
})


// Retrieves a list of subjects
app.get('/subjects', function (req, res) {
    console.log(`GET /subjects ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let subjects = JSON.parse(data).subjects;
        console.log(subjects);
        res.send(subjects);
    });
})


// Retrieves a list of groups
app.get('/groups', function (req, res) {
    console.log(`GET /groups ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let groups = JSON.parse(data).groups;
        console.log(groups);
        res.send(groups);
    });
})

// Retrieves list of activities for specific group
app.get('/groups/:id/activities', function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`GET /group/${id}/activities ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, json) {
        let data = JSON.parse(json);
        let group = data.groups[id];
        let activities = data.activities.filter(a => a.group === group);
        console.log(activities);
        res.send(activities);
    });
})


// Retrieves a specific activity
app.get('/activities/:id', function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`GET /activities/${id} ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let activity = JSON.parse(data).activities[id];
        console.log(activity);
        res.send(activity);
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})