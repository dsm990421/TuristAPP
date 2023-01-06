var express = require('express');
var pagosControlador = require('../controlador/pagosControlador');
var api = express.Router();

api.get('/pagar', pagosControlador.createPayment);

module.exports = api;