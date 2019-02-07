var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAuth = require('../middleware/auth');

// var SEED = require('../config/config').SEED;

var app = express();
var User = require('../models/usuario');

// ######################################################
//                  Obtain an user
// ######################################################

app.get('/', (req, res, next) => {

    User.find({}, 'nombre email img role')
        .exec(

            (err, usuarios) => {

                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: 'Database error: While loading users!',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })
});

// ######################################################
//                  Update an user
// ######################################################
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    User.findById(id, (err, usuario) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error while searching the user',
                errors: err
            });
        }

        if (!usuario) {
            res.status(400).json({
                ok: false,
                message: 'User with id: ' + id + ' does not exists',
                errors: { message: 'There is not a user that match this id' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    message: 'Error while updating the user',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)'
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        })
    });
});

// ######################################################
//      Create an user --- with encrypted password        
// ######################################################
app.post('/', mdAuth.verificaToken, (req, res) => {

    var body = req.body;
    var user = new User({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save((err, usuarioGuardado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error while creating the user',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    })
});

// ######################################################
//                  Delete an user
// ######################################################
app.delete('/:id', (req, res) => {

    var id = req.params.id;
    User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'Error while deleting the user',
                errors: err
            });
        }
        if (!deletedUser) {
            res.status(400).json({
                ok: false,
                message: 'User with id: ' + id + ' does not exists',
                errors: { message: 'There is not a user that match this id' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: deletedUser
        });
    });
});

module.exports = app;