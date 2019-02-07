// Requires external libraries we use to do smt
var express = require('express');
var mongoose = require('mongoose');

// Variable inizialization
var app = express();

// Database connection
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;
    console.log('Database running on 27017 port: \x1b[32m%s\x1b[0m', 'online');
});

// Routes
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'Everything went fine!'
    })

});


// Listen petitions -- We specify a green color for the word online
app.listen(3000, () => {
    console.log('Express server running on 3000 port: \x1b[32m%s\x1b[0m', 'online');
})