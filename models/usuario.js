var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a allowed role'
}


var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'Name required'] },
    email: { type: String, unique: true, required: [true, 'email required'] },
    password: { type: String, required: [true, 'password required'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);