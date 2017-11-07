//adding our dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http');
var serveStatic = require("serve-static");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.query());
app.use(express.static(path.join(__dirname + "/dist")));

Student = require('./models/students')

//connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://studentapp:studentapp@ds145275.mlab.com:45275/students',
    {useMongoClient: true}
);
var db = mongoose.connection;

//routes

//Get All Students
app.get('/api/students', function(req, res){
    Student.find({}).exec(function(err, students) {
        if (err) throw err;
    }).then(function(students) {
        res.send(students);
    });
});

//get Students by Id
app.get("/api/students/:id", function(req, res) {
  Student.findById(req.params.id, function(err, student) {
      if (err) throw err;
    })
    .then(function(student) {
      res.send(student);
    });
});

//Add/Post Students
app.post('/api/students/add', function(req, res){
    console.log(req.body);
    var student = {
        name: req.body.name,
        RegNumber: req.body.RegNumber,
        Faculty: req.body.Faculty,
        Dept: req.body.Dept,
        Level: req.body.Level
    }
    Student.create(student, function(err, student) {
        if (err) throw err;
    }).then(function(student) {
        res.send(student);
    });
});

//Put Students
app.put("/api/students/update/:id", function(req, res) {
    var id = req.params.id;
    var student = {
        name: req.body.name,
        RegNumber: req.body.reg_number,
        Faculty: req.body.faculty,
        Dept: req.body.dept,
        Level: req.body.level
    };
    Student.updateStudent(id, student, function(err, students) {
        if (err) throw err;
        console.log(students);
        res.send(students);
    })
});

//Delete Students
app.delete("/api/students/delete/:id", function(req, res){
    var id = req.params.id;
    Student.removeStudent(id, function(err, students) {
      if (err) throw err;
      console.log(students);
      res.send(students);
    })
});

// All other routes
app.get("*", function(req, res) {
  res.sendFile(__dirname + "./public");
});


//start the server

app.on("listening", function() {
  console.log("ok, app is running");
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("server started " + port);

