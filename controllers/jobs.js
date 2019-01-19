const path      = require('path');
const express    = require('express');

const mongoose  = require('mongoose');

const Job       = require('../models/models').Job;
const Staff     = require('../models/models').Staff;

const demoJobs  = require('./../models/Jobs.json')
const demoStaff = require('./../models/Staff.json')

const Router    = express.Router();

Staff.find({}, (err, staffs) => {
    if(staffs.length == 0) Staff.insertMany(demoStaff, (err) => console.error(err));
});

Router.get('/', (req, res) => {
    Job.find({}).populate('staff').sort('date').exec((err, jobs) => {
        if(err) return res.status(500).send();

        res.render('jobs-overview', {
            jobs: jobs
        });
    });
});

Router.get('/new', (req, res) => {    
    res.render('jobs-new');
});

Router.get('/:id', (req, res) => {    
    Job.find({_id : req.params.id}).populate('staff').exec((err, job) => res.send(job));
});

module.exports = Router;