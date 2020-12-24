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
                (activityId === undefined && slot === undefined) ||
                (t === (activity && activity.teacher)) ||
                !(data.activities.filter(a => a.slot === slot).map(a => a.teacher).includes(t))
            )
        );
        console.log(teachers);
        res.status(200).send(teachers);
    });
})

// Delete a specific teacher
app.delete("/teachers/:id", function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`DELETE /teachers/${req.params.id} ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data)

    // check if provided id is not bad
    if (id < 0 || id >= data.teachers.length) {
        res.status(400).send({ message: "Teacher you are trying to delete doesn't exist." });
        return;
    }

    // check if the teacher is used in activity
    if (data.activities.map(a => a.teacher).includes(data.teachers[id])) {
        res.status(405).send({ message: "Teacher you are trying to delete is used in an activity." })
        return;
    }

    data.teachers.splice(id, 1);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.status(204).send();
    });
})

// Create a new teacher
app.post('/teachers', function (req, res) {
    console.log(`POST /teachers ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);
    data.teachers.push(req.body.newTeacher);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        console.log(data.teachers);
        res.status(201).send();
    });
})

// Update a specific teacher
app.put('/teachers/:id', function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`PUT /teachers/${id} ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);

    // check if provided id is not bad
    if (id < 0 || id >= data.teachers.length) {
        res.status(400).send({ message: "Teacher you are trying to update doesn't exist." });
        return;
    }

    // check if the teacher is used in activity
    if (data.activities.map(a => a.teacher).includes(data.teachers[id])) {
        res.status(405).send({ message: "Teacher you are trying to update is used in an activity." })
        return;
    }

    data.teachers[id] = req.body.teacher;
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.status(200).send();
    });
})


// Retrieve a list of rooms
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
        res.status(200).send(rooms);
    });
})


// Retrieve a list of subjects
app.get('/subjects', function (req, res) {
    console.log(`GET /subjects ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let subjects = JSON.parse(data).subjects;
        console.log(subjects);
        res.status(200).send(subjects);
    });
})


// Retrieve a list of groups
app.get('/groups', function (req, res) {
    console.log(`GET /groups ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let groups = JSON.parse(data).groups;
        console.log(groups);
        res.status(200).send(groups);
    });
})

// Retrieve list of activities for specific group
app.get('/groups/:id/activities', function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`GET /group/${id}/activities ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, json) {
        let data = JSON.parse(json);

        // check if provided id is not bad
        if (id < 0 || id >= data.groups.length) {
            res.status(400).send({ message: "Group which you have selected doesn't exist." });
            return;
        }

        let group = data.groups[id];

        let activities = data.activities
            // workaround because activities doesn't contain their ids
            .map((a, idx) => { return { idx, a } })
            .filter(({ _, a }) => a.group === group);
        console.log(activities);
        res.status(200).send(activities);
    });
})


// Retrieve a specific activity
app.get('/activities/:id', function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`GET /activities/${id} ${req.ip}`);
    fs.readFile(__dirname + "/" + "data.json", function (err, json) {
        let data = JSON.parse(json);

        // check if provided id is not bad
        if (id < 0 || id >= data.activities.length) {
            res.status(400).send({ message: "Activity you are trying to get doesn't exist." });
            return;
        }

        let activity = data.activities[id];
        console.log(activity);
        res.status(200).send(activity);
    });
})

// Delete a specific activity
app.delete("/activities/:id", function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`DELETE /activities/${req.params.id} ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data)

    // check if provided id is not bad
    if (id < 0 || id >= data.activities.length) {
        res.status(400).send({ message: "Activity you are trying to delete doesn't exist." });
        return;
    }

    data.activities.splice(id, 1);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.activities);
        res.status(204).send();
    });
})

// Create a new activity
app.post('/activities', function (req, res) {
    console.log(`POST /activities ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);
    data.activities.push(req.body.newActivity);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.activities);
        res.status(201).send();
    });
})

// Update a specific activity
app.put('/activities/:id', function (req, res) {
    let id = parseInt(req.params.id, 10);
    console.log(`PUT /activities/${id} ${req.ip}`);
    let data = fs.readFileSync(__dirname + "/" + "data.json");
    data = JSON.parse(data);


    // check if provided id is not bad
    if (id < 0 || id >= data.activities.length) {
        res.status(400).send({ message: "Activity you are trying to update doesn't exist." });
        return;
    }

    data.activities[id] = req.body.activity;
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.activities);
        res.status(200).send();
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

// todo move error messages to server
// handle error codes
// front: use alerts