const dotenv = require("dotenv-json")();
const mongoose = require('mongoose');
const models = require('./../models');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/jobplaner';
const MONGO_USER = process.env.MONGO_USER || 'admin';
const MONGO_PASS = process.env.MONGO_PASS || 'admin';
const MONGO_AUTHSOURCE = process.env.MONGO_AUTHSOURCE || 'admin';

const MONGO_CONFIG = {
    "user": MONGO_USER,
    "pass": MONGO_PASS,
    "auth": {
        "authSource": MONGO_AUTHSOURCE
    },
    useNewUrlParser: true
}

mongoose.connect(MONGO_URL, MONGO_CONFIG).then(
    () => {

        models.Job.deleteMany({ title : "Test Job"}).exec((err,jobs) => {
            if(err) console.error(err);
            console.log("deleted: \n" + JSON.stringify(jobs));
        });

        models.Staff.deleteMany({ nickname : "OR"}).exec((err,staffs) => {
            if(err) console.error(err);
            console.log("deleted: \n" + JSON.stringify(staffs));
        });

        new models.Staff({
            _id: new mongoose.Types.ObjectId(),
            name: {
                first: "Oliver",
                last: "Rademaker"
            },
            nickname: "OR"
        }).save((err, staff) => {
            if (err) return console.error(err);

            new models.Job({
                _id: new mongoose.Types.ObjectId(),
                title: "Test Job",
                location: "Test Hausen",
                staff : [
                    staff
                ]
            }).save((err, job) => {
                if(err) return console.error(err);
                
                models.Job.find({ title: "Test Job" }).populate('staff').exec((err, job) => {
                    if (err) return console.error(err);
                    console.log(job);
                    mongoose.connection.close();
                });
            });
        });
    }
);


