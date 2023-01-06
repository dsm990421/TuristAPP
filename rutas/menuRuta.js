'use strict'

var express = require('express');
var menuControlador = require('../controlador/menuControlador');

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/menu' });
var api = express.Router();


api.post('/registro', menuControlador.registrarServicio);
api.put('/actualizar/:id', menuControlador.actualizarServicio);
api.get('/eliminar/:id', menuControlador.eliminarServicio)
api.get('/obtenerServicios/:negocio', menuControlador.obtenerServicios);
api.get('/obtenerdatos/:id', menuControlador.datoServicio);
api.get('/get_imagen/:imageFile', menuControlador.getFoto);
api.post('/subirimagen/:id/', dir_fotos, menuControlador.ActualizarFoto2);

module.exports = api;