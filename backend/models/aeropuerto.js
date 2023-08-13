'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AeropuertoSchema = Schema({
    ubicacion: String,
    nombre: String
}, {
  collection: 'aeropuertos'
});

module.exports = mongoose.model('Aeropuerto', AeropuertoSchema);