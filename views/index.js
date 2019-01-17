const path      = require('path')
const express   = require('express');
const mongoose  = require('mongoose');

const Job       = require('./../models/models').Job;
const Staff     = require('./../models/models').Staff;

const Router    = express.Router();

const demoJobs  = require('./../models/Jobs.json')
const demoStaff = require('./../models/Staff.json')

//Job.insertMany(demoJobs, (err) => console.error(err));
Staff.find({}, (err, staffs) => {
    if(staffs.length == 0) Staff.insertMany(demoStaff, (err) => console.error(err));
});

Router.use('/statics', require(path.join(__dirname, 'statics')));

Router.get('/', (req, res) => {
    Job.find({}, function (err, jobs) {
        if(typeof err === null) {
            res.status(500).send();
        }
        res.render('jobs', {
            jobs: jobs,
            helpers: {
                toJSON: function (data) {
                    return JSON.stringify(data);
                }
            }
        });
    });

});

Router.get('/jobs/new', (req, res) => {    
    res.render('newJob');
});

Router.get('/jobs/:id', (req, res) => {    
    Job.find({_id : req.params.id}, (err, job) => res.send(job));
});

module.exports = Router;