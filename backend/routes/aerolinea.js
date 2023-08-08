'use strict'
var express = require('express');
var AerolineaController = require('../controllers/aerolinea');
var router = express.Router();


//ver informacion de todos los vuelos
router.get('/vuelos', AerolineaController.getVuelosTotal);
//ver informacion de vuelos pasando parametros
router.get('/buscar-vuelos', AerolineaController.getBuscarVuelos);
//seleccion de un vuelo
router.post('/seleccionar-vuelo/:id', AerolineaController.postSeleccionVuelo);
//ver el resumen de compra del vuelo seleccionado (incluye descuentos)
router.get('/ver-resumen/:id', AerolineaController.getResumenCompra);

module.exports = router;
