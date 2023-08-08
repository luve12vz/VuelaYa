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
                origen: origen,
                destino: destino,
                fechaSalida: new Date(fechaSalida),
                fechaRetorno: fechaRetorno ? new Date(fechaRetorno) : { $exists: false }
            }).exec();
            if (!rutasEncontradas || rutasEncontradas.length === 0){
                return res.status(404).send({ message: 'No existen vuelos con esta ruta'});
            }
            return res.status(200).send({rutasEncontradas} );

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
            const vueloId = req.params.id;
            const vueloSeleccionado = await Vuelo.findById(vueloId);
    
            if (!vueloSeleccionado) {
                return res.status(404).send({ message: 'Vuelo no encontrado' });
            }
    
            const adultos = req.body.adultos || 0;
            const ninos = req.body.ninos || 0;
            const jovenes = req.body.jovenes || 0;
            const terceraEdad = req.body.terceraEdad || 0;
    
            // Calcular subtotal
            const subtotal = vueloSeleccionado.precio * (adultos + jovenes + terceraEdad);

    
            // Calcular descuentos para niños y tercera edad
            const descuentoNinos = vueloSeleccionado.precio * ninos; // Niños no pagan
            const descuentoTerceraEdad = (vueloSeleccionado.precio * terceraEdad) / 2;
            
            
            const precioPreventivo = subtotal - descuentoNinos - descuentoTerceraEdad;
            // Calcular impuestos (puedes ajustar esta parte según tus necesidades)
            const impuestos = precioPreventivo * 0.1; // Ejemplo 10% de impuestos
    
            // Calcular precio total
            const precioTotal = precioPreventivo + impuestos;
    
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