const path      = require('path')
const express   = require('express');

const Router    = express.Router();

Router.use('/statics', require(path.join(__dirname, 'statics')));
Router.use('/jobs', require(path.join(__dirname, 'jobs')));

Router.get('/', (req, res) => res.redirect('/jobs'));

module.exports = Router;