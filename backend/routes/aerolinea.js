'use strict'
var express = require('express');
var AerolineaController = require('../controllers/aerolinea');
var router = express.Router();


//ver informacion de todos los vuelos
router.get('/vuelos', AerolineaController.getVuelosTotal);
//ver informacion de vuelos pasando parametros
router.get('/buscar-vuelos', AerolineaController.getBuscarVuelos);


module.exports = router;
