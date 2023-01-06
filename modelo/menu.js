'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaMenu = Schema({
    nombre: String,
    precio: String,
    descripcion: String,
    imagen: String,
    negocio: { type: Schema.ObjectId, ref: "negocios" }

});

module.exports = mongoose.model('menus', EsquemaMenu);