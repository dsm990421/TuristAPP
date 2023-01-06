'use strict'

var express = require('express');
var UsuarioControlador = require('../controlador/usuarioControlador');

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './cargas/usuario' });
var api = express.Router();

api.post('/registro', UsuarioControlador.registrarUsuario);
api.post('/login', UsuarioControlador.accesoUsuario);
api.put('/actualizar/:id', UsuarioControlador.actualizarUsuario);
api.post('/actualizar-imagen-usuario/:id', dir_fotos, UsuarioControlador.actualizarFoto);
api.get('/get_imagen/:imageFile', UsuarioControlador.getFoto);
api.post('/getDatos', UsuarioControlador.getDatos);
api.post('/subirimagen/:id/', dir_fotos, UsuarioControlador.ActualizarFoto2);
api.get('/eliminar/:id/', UsuarioControlador.eliminarUsuario);
module.exports = api;