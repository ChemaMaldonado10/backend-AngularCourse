// Requires external libraries we use to do smt
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Variable inizialization
var app = express();

// Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes import
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');

// Database connection
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;
    console.log('Database running on 27017 port: \x1b[32m%s\x1b[0m', 'online');
});

// Routes
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Listen petitions -- We specify a green color for the word online
app.listen(3000, () => {
    console.log('Express server running on 3000 port: \x1b[32m%s\x1b[0m', 'online');
})