'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RutaSchema = Schema({
  origen: String,
  destino: String,
  fechaSalida: Date, // Cambio de tipo de dato a Date
  fechaRetorno: Date, // Cambio de tipo de dato a Date
}, {
  collection: 'rutas'
});

module.exports = mongoose.model('Ruta', RutaSchema);
