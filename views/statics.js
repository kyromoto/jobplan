const path      = require('path');
const express    = require('express');

const Router     = express.Router();
const nmDir     = path.join(__dirname, '..', 'node_modules');

Router.use('/css', express.static(path.join(__dirname, 'css')));
Router.use('/mat-css', express.static(path.join(nmDir, 'materialize-css', 'dist')));
Router.use('/jquery', express.static(path.join(nmDir, 'jquery', 'dist')));
Router.use('/vue', express.static(path.join(nmDir, 'vue', 'dist')));
Router.use('/moment', express.static(path.join(nmDir, 'moment', 'min')));

module.exports = Router;