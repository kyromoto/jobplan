const path = require('path');
const express = require('express');

const Job = require('../models/models').Job;
const Staff = require('../models/models').Staff;

const demoJobs = require('./../models/test/Jobs.json')
const demoStaff = require('./../models/test/Staff.json')

const Router = express.Router();

Staff.remove({}, err => console.log(err));
Job.remove({}, err => console.log(err));

Staff.create(demoStaff)
    .then(staffs => {
        let getRandomIndexFromArray = (array) => Math.floor(Math.random() * array.length);
        
        demoJobs.forEach(job => {
            job.staff = [
                staffs[getRandomIndexFromArray(staffs)]._id,
                staffs[getRandomIndexFromArray(staffs)]._id
            ];

            Job.create(demoJobs).catch(err => console.error(err));
        })
    })
    .catch(err => console.error(err));

Router.get('/', (req, res) => {
    Job.find({}).populate('staff').sort('date')
        .then(jobs => {
            res.render('jobs-overview', {
                jobs: jobs
            });
        })
        .catch(err => res.status(500).send())
});

Router.post('/', (req, res) => {
    res.redirect('/');
});

Router.get('/:id', (req, res) => {
    Job.find({ _id: req.params.id }).populate('staff')
        .then(job => res.send(job))
        .catch(err => res.status(404).send())
});

Router.delete('/:id', (req, res) => {
    Job.deleteOne({ _id: req.params.id })
        .then((deletedJob) => {
            res.json(deletedJob)
        })
        .catch((err) => {
            res.status(404).send();
        })
});

module.exports = Router;