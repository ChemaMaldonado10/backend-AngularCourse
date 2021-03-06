var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


// ######################################################
//                  Verify token
// ######################################################
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Not a valid token',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();

    });
}