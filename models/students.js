//dependencies
var mongoose = require('mongoose');

//schema
var studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    RegNumber:{
        type:String,
        required:true,
        unique: true
    },
    Faculty:{
        type:String,
        required:true
    },    
    Dept:{
        type:String,
        required:true
    },
    Level:{
        type:Number,
        required:true
    }
});

    //return routes
    var Student = mongoose.model("Student", studentSchema);
    module.exports = Student;
    
    //Get Students
    module.exports.getStudents = function(callback, limit){
        Student.find(callback).limit(limit);
    }

    //Get Students by Id
    module.exports.getStudentById = function(id, callback){
        Student.findById(id, callback);
    }

    //update Students
    module.exports.updateStudent = function(id, student, callback) {
        var query = {_id: id};
        var update = {
            name:student.name,
            RegNumber:student.RegNumber,
            Faculty:student.Faculty,
            Dept:student.Dept,
            Level:student.Level
        }
        return Student.findOneAndUpdate(query, update, callback);
    };

    //Delete Students
    module.exports.removeStudent = function(id,callback, limit){
        var query = {_id: id};
        Student.remove(query, callback);
    }

