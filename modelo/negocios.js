'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaNegocio = Schema({
    nombre: String,
    latitud: String,
    longitud: String,
    codigopostal: String,
    zona: String,
    email: String,
    telefono: String,
    descripcion: String,
    imagen: String,
    password: String,
    premium: String,
    tipo: String,
    numero_ediciones: String
});

module.exports = mongoose.model('negocios', EsquemaNegocio);