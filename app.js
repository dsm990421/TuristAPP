'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use('/static', express.static(`${__dirname}/uploads`));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

var user_routes = require('./rutas/usuarioRuta');
var rutas_negocios = require('./rutas/negocioRuta');
var rutas_menus = require('./rutas/menuRuta');
var rutas_pago = require('./rutas/pagosRuta');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http

// rutas base
app.use('/usuarios', user_routes);
app.use('/negocios', rutas_negocios);
app.use('/menu', rutas_menus);
app.use('/pagos', rutas_pago)

//app.get('/pruebas', function(req, res) {
//    res.status(200).send({ mesage: 'Bienvenido  al curso Ivan Azamar' });
//});

module.exports = app;