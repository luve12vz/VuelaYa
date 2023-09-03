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
//obtener aeropuertos
router.get('/aeropuertos', AerolineaController.getAeropuertos);
//obtener vuelos por medio del id de rutas
router.get('/lista-vuelos/:idRuta', AerolineaController.getVueloByRutaId);
//obtener ruta por id
router.get('/ruta/:id', AerolineaController.getRutaById);
//obtener vuelo por id
router.get('/vuelo/:id', AerolineaController.getVueloById);
//enviar correo de factura
router.post('/pago', AerolineaController.postEnviarCorreo);
module.exports = router;
