const dotenv    = require("dotenv-json")();
const express   = require('express');
const mongoose  = require('mongoose');
const exphbs    = require('express-handlebars');

const app = express();

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/jobplaner';
const MONGO_USER = process.env.MONGO_USER || 'admin';
const MONGO_PASS = process.env.MONGO_PASS || 'admin';
const MONGO_AUTHSOURCE = process.env.MONGO_AUTHSOURCE || 'admin';

const MONGO_CONFIG = {
    "user" : MONGO_USER,
    "pass" : MONGO_PASS,
    "auth" : {
        "authSource" : MONGO_AUTHSOURCE
    },
    useNewUrlParser: true
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', require('./views'));

mongoose.connect(MONGO_URL, MONGO_CONFIG).then(
    () => {
        console.log("DB is connected")
        app.listen(PORT, () => console.log('Server is listening on port %s', PORT));
    },
    err => console.error(err)
);

module.exports = app;