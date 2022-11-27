'use strict'

var express = require('express');
var UsuarioControlador = require('../controlador/usuarioControlador');

var api = express.Router();

api.get('/probando-controlador', UsuarioControlador.prueba);
api.post('/registro', UsuarioControlador.registrarUsuario);
api.post('/login', UsuarioControlador.accesoUsuario);


module.exports = api;