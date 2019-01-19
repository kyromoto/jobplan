const path      = require('path');
const express    = require('express');

const Router     = express.Router();
const nmDir     = path.join(__dirname, '..', 'node_modules');
const viewsDir  = path.join(__dirname, '..', 'views');

Router.use('/css', express.static(path.join(viewsDir, 'css')));
Router.use('/js', express.static(path.join(viewsDir, 'js')));

Router.use('/mat-css', express.static(path.join(nmDir, 'materialize-css', 'dist')));
Router.use('/jquery', express.static(path.join(nmDir, 'jquery', 'dist')));
Router.use('/vue', express.static(path.join(nmDir, 'vue', 'dist')));
Router.use('/moment', express.static(path.join(nmDir, 'moment', 'min')));

module.exports = Router;