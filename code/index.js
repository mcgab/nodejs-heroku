const express = require('express')
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
require('dotenv').load();
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

var port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors())
app.use('/static', express.static( __dirname + '/static'))

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({
        "message": "waiting for connections"
    });
});

// init app 
app.listen(port, function () {
    console.log('listening on ', port);
})
