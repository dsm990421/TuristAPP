'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaArtista = ({
    nombre: String,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model('artistas', EsquemaArtista);