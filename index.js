const express = require('express');
const connection = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
//fs = require('fs'),
//https = require('https');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'client')));

// const routes = require("./routes/")
app.use('/', require('./routes'));
//serving static files
app.use('/images', express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
  res.send('We are live again');
});

app.use(function (req, res, next) {
  res.status(404).json({ errorCode: 404, errorMsg: 'Route not found!' });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3002, function () {
  console.log('Listening on port ' + server.address().port);
});
