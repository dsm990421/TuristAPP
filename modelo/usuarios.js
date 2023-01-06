'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaUsuarios = Schema({
    nombre: String,
    email: String,
    telefono: String,
    password: String,
    imagen: String
});

module.exports = mongoose.model('usuarios', EsquemaUsuarios);