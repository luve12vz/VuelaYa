'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VueloSchema = Schema({
  numeroVuelo: String,
  duration: Number,
  ruta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ruta',
    required: true
  },
  precio: Number,
  horaLlegada: Number, 
  horaSalida: Number,
  pasajerosMaximo: Number,  
  pasajerosReserva: Number,  
  pasajerosDisponibles: Number
}, {
  collection: 'vuelos'
});

module.exports = mongoose.model('Vuelo', VueloSchema);
