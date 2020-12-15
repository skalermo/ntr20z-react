let express = require('express');
let app = express();

// To be able to parse req.body
app.use(express.json());

let fs = require("fs");

app.get('/teachers', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        let teachers = JSON.parse(data).teachers;
        console.log(teachers);
        res.send(teachers);
    });
})

app.delete('/deleteTeacher', function (req, res) {
    let id = req.body.teacherToDelete;
    let data = require(__dirname + "/" + "data.json");

    data.teachers.splice(id, 1);
    console.log(data.teachers);
    fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(data, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(data.teachers);
        res.send(data.teachers);
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})