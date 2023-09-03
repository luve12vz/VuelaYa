'use strict'
var Vuelo = require("../models/vuelo");
var Ruta = require("../models/ruta");
var aeropuerto = require("../models/aeropuerto");
const nodemailer = require('nodemailer');
const { default: mongoose } = require("mongoose");

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
            if (!rutasEncontradas || rutasEncontradas.length === 0) {
                return res.status(404).send({ message: 'No existen vuelos con esta ruta' });
            }
            return res.status(200).send({ rutasEncontradas });

        } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    getAeropuertos: async function (req, res) {
        try {
            const aeropuertos = await aeropuerto.find().sort('nombre');
            if (!aeropuertos || !aeropuertos.length === 0) {
                return res.status(404).send({ message: 'No existen aeropuertos' });
            }
            return res.status(200).send({ aeropuertos });
        } catch (err) {
            return res.status(500).send({ message: "Error al recuperar los datos de aeropuertos" })
        }
    },
    getVueloByRutaId: async function (req, res) {
        var idRuta;

        try {
            idRuta = new mongoose.Types.ObjectId(req.params.idRuta);
            console.log(idRuta);
        } catch (err) {
            console.log(err);
            res.status(500).send("El ID de ruta no es valido");
            return;
        }
        try {
            const idRuta = new mongoose.Types.ObjectId(req.params.idRuta);
            const listaVuelos = await Vuelo.find({ ruta: idRuta }).exec();
            if (!listaVuelos || listaVuelos.length === 0) {
                return res.status(404).send({ listaVuelos });
            }
            return res.status(200).send({ listaVuelos });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    getRutaById: async function (req, res) {
        const rutaId = req.params.id;
        if (!rutaId) {
            return res.status(404).send({ message: 'La ruta no existe' });
        }

        try {
            const ruta = await Ruta.findById(rutaId);
            if (!ruta) {
                return res.status(404).send({ message: 'La ruta no existe' });
            }
            return res.status(200).send({ ruta });
        } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    getVueloById: async function (req, res) {
        const vueloId = req.params.id;
        if (!vueloId) {
            return res.status(404).send({ message: 'El vuelo no existe' });
        }

        try {
            const vuelo = await Vuelo.findById(vueloId);
            if (!vuelo) {
                return res.status(404).send({ message: 'La ruta no existe' });
            }
            return res.status(200).send({ vuelo });
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
    },
    postEnviarCorreo: async function (req, res) {
        try {
            console.log('Controlador postEnviarCorreo activado');
            const { name, cedula, email, address } = req.body;
            console.log('Datos recibidos:', { name, cedula, email, address });
            // Configura el transporte de correo
            let transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                tls: {
                    rejectUnauthorized: false
                },
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: "corre del emisor",
                    pass: "xxxxxx",
                }
            });

            // Configura las opciones de correo
            let mailOptions = {
                from: 'VuelaYa correoEmisor',
                to: email,
                subject: 'Resumen de Compra',
                text: `Hola ${name}, gracias por tu compra. Tu cédula es ${cedula} y tu dirección es ${address}. Aquí está tu resumen...`
            };

            // Envía el correo
            try {
                console.log('Intentando enviar correo');
                const result = await transporter.sendMail(mailOptions);
                console.log('Correo enviado con éxito');
                console.log(result)
                res.status(200).send('Correo enviado');
            } catch (error) {
                console.log(error);
                res.status(500).send('Error al enviar el correo electronico');
            }

        } catch (error) {
            console.log('Error capturado:', error);
            return res.status(500).json({ message: 'Error al enviar el correo' });
        }
    }


}
module.exports = controller;