'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VueloSchema = Schema({
  numeroVuelo: String,
  duration: Number,
  ruta: {
    type: Schema.Types.ObjectId,
    ref: 'Ruta',
    required: true
  },
  precio: Number,
  horaLlegada: Number, // Hora de llegada en formato de 24 horas (puedes ajustar si necesitas minutos)
  horaSalida: Number, // Hora de salida en formato de 24 horas (puedes ajustar si necesitas minutos)
}, {
  collection: 'vuelos'
});

module.exports = mongoose.model('Vuelo', VueloSchema);
