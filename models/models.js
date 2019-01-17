const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    _id : 'ObjectId',
    title : 'String',
    date : 'String',
    location : 'String',
    staff : [{ type : 'ObjectId', ref : 'Staff'}],
    info : 'String'
});

const staffSchema = new mongoose.Schema({
    _id : 'ObjectId',
    name : {
        first : "String",
        last : "String",
    },
    nickname : "String"
});

exports.Job = mongoose.model('Job', jobSchema);
exports.Staff = mongoose.model('Staffs', staffSchema);