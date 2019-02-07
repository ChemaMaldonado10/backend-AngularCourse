var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var User = require('../models/usuario');

app.post('/', (req, res) => {
    var body = req.body;

    User.findOne({ email: body.email }, (err, UsrDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error while searching for users',
                errors: err
            });
        }
        if (!UsrDB) {
            res.status(400).json({
                ok: false,
                message: 'Incorrect credentials - email ',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, UsrDB.password)) {
            res.status(400).json({
                ok: false,
                message: 'Incorrect credentials - password ',
                errors: err
            });
        }

        // Create a token
        UsrDB.password = ':)'
        var token = jwt.sign({ usuario: UsrDB }, 'SEED', { expiresIn: 14400 });

        res.status(200).json({
            ok: 'true',
            usuario: UsrDB,
            token: token,
            id: UsrDB._id
        });
    })



});




module.exports = app;