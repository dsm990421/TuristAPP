'use strict'

var express = require('express');
var negocioControlador = require('../controlador/negociosControlador');

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/negocio' });
var api = express.Router();


api.post('/registro', negocioControlador.registrarNegocio);
api.post('/login', negocioControlador.accesoNegocio);
api.put('/actualizar/:id', negocioControlador.actualizarNegocio);
api.post('/actualizar_imagen/', dir_fotos, negocioControlador.actualizarFoto);
api.get('/lista_negocios/:zona', negocioControlador.getNegocios);
api.get('/get_imagen/:imageFile', negocioControlador.getFoto);
api.post('/subirimagen/:id/', dir_fotos, negocioControlador.ActualizarFoto2);
api.get('/getnegocio/:id', negocioControlador.datosNegocio);
api.get('/eliminar_negocio/:id', negocioControlador.eliminarNegocio);
api.get('/buscarnegocio/:tipo', negocioControlador.busquedaNegocios);

module.exports = api;