const { response } = require("express");
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    try {
        const eventos = await Evento.find()
                                    .populate('user','name');

        if (!eventos) {
            return res.status(404).json({
                ok: false,
                msg: 'No events found'
            })
        }
        res.status(200).json({
            ok: true,
            msg: 'Events were delivered successfully',
            eventos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const crearEvento = async (req, res = response) => {
    const evento = new Evento( req.body );
    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'event not found'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to do this'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // it returns old doc by default but we can send { new: true } to return new
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'event not found'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to do this'
            });
        }

        await Evento.findByIdAndRemove(eventoId);

        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}