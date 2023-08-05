'use strict'
var Vuelo = require("../models/vuelo");
var Ruta = require("../models/ruta");

var controller = {
    getVuelosTotal: async function (req, res) {
        try {
            const vuelos = await Vuelo.find({}).sort();
            if (vuelos.length === 0) {
                return res.status(404).send({ message: 'No hay vuelos para mostrar' });
            }
            return res.status(200).send({ vuelos });
        } catch (err) {
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }
    },
    getBuscarVuelos: async function (req, res) {
        const { origen, destino, fechaSalida, fechaRetorno } = req.query;
        try {
            const rutasEncontradas = await Ruta.find({
                origen,
                destino,
                fechaSalida: new Date(fechaSalida),
      fechaRetorno: fechaRetorno ? new Date(fechaRetorno) : { $exists: false }
            });

            // Obtiene los id de las rutas encontradas
            const idsRutasEncontradas = rutasEncontradas.map(ruta => ruta._id);
            // Busca los vuelos asociados a las rutas encontradas
            const vuelosEncontrados = await Vuelo.find({ ruta: { $in: idsRutasEncontradas } }).populate('ruta');
            return res.status(201).send({ vuelosEncontrados });

        } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    }


}
module.exports = controller;