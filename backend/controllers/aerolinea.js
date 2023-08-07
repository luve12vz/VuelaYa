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

        // Valores de pasajeros de la solicitud
        const adultos = parseInt(req.query.adultos) || 0;
        const ninos = parseInt(req.query.ninos) || 0;
        const jovenes = parseInt(req.query.jovenes) || 0;
        const terceraEdad = parseInt(req.query.terceraEdad) || 0;

        // Sumar los valores de pasajeros de todas las categorías
        const totalPasajeros = adultos + ninos + jovenes + terceraEdad;

        try {
            //Buscar RUTAS disponibles
            const rutasEncontradas = await Ruta.find({
                origen,
                destino,
                fechaSalida: new Date(fechaSalida),
                fechaRetorno: fechaRetorno ? new Date(fechaRetorno) : { $exists: false }
            });
            const vuelosDisponibles = [];
            // Obtiene los id de las rutas encontradas
            const idsRutasEncontradas = rutasEncontradas.map(ruta => ruta._id);
            for (const ruta of rutasEncontradas) {
                // Busca los vuelos asociados a las rutas encontradas
                const vuelosEncontrados = await Vuelo.find({ ruta: { $in: idsRutasEncontradas } }).populate('ruta');
                for (const vuelo of vuelosEncontrados) {
                    if (vuelo.pasajerosDisponibles >= totalPasajeros) {
                        vuelosDisponibles.push(vuelo);
                    }
                }
            }
            return res.status(201).send({ vuelosDisponibles });

        } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    postSeleccionVuelo: async function (req, res) {
        try {
            const vueloId = req.params.id;
            const vueloSeleccionado = await Vuelo.findById(vueloId).populate('ruta');

            if (!vueloSeleccionado) {
                return res.status(404).send({ message: 'Vuelo no encontrado' });
            }

            // Actualizar la cantidad de pasajeros reservados y disponibles en el vuelo
            vueloSeleccionado.pasajerosReserva += req.body.pasajeros;
            vueloSeleccionado.pasajerosDisponibles -= req.body.pasajeros;
            await vueloSeleccionado.save();

            return res.status(200).send({ message: 'Vuelo seleccionado con éxito' });

        } catch (error) {
            return res.status(500).json({ message: 'Error al seleccionar el vuelo' });
        }
    },

    getResumenCompra: async function (req, res) {
        try {
            const vueloId = req.params.vueloId;
            const vueloSeleccionado = await Vuelo.findById(vueloId);

            if (!vueloSeleccionado) {
                return res.status(404).send({ message: 'Vuelo no encontrado' });
            }

            const { adultos, ninos, jovenes, terceraEdad } = req.body;

            // Calcular subtotal
            const subtotal = vueloSeleccionado.precio * (adultos + jovenes + terceraEdad);

            // Calcular descuentos para niños y tercera edad
            const descuentoNinos = vueloSeleccionado.precio * ninos; // Niños no pagan
            const descuentoTerceraEdad = (vueloSeleccionado.precio * terceraEdad) / 2;

            // Calcular impuestos (puedes ajustar esta parte según tus necesidades)
            const impuestos = subtotal * 0.1; // Ejemplo 10% de impuestos

            // Calcular precio total
            const precioTotal = (subtotal - descuentoNinos - descuentoTerceraEdad) + impuestos;
            
            return res.status(200).send({
                vuelo: vueloSeleccionado,
                subtotal,
                descuentoNinos,
                descuentoTerceraEdad,
                impuestos,
                precioTotal
              });
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el resumen de compra' });
        }
    }

}
module.exports = controller;