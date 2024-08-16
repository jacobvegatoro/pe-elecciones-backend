
const { response } = require('express');

const Elector = require('../models/elector');

const getElectores = async (req, res = response) => {

    const electores = await Elector.find()
                            .populate('usuario','nombre email')
                            .populate('mesa','nombre circunscripcion comuna');

    res.json({
        ok: true,
        electores
    });
}

const crearElector = async (req, res = response) => {

    const uid = req.uid;
    const elector = new Elector({
        usuario: uid,
        ...req.body
    });

    try {
        const electorDB = await elector.save();

        res.json({
            ok: true,
            elector: electorDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el elector'
        });        
    }
}

const actualizarElector = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarElector'
    });
}

const borrarElector = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarElector'
    });
}

module.exports = {
    getElectores,
    crearElector,
    actualizarElector,
    borrarElector
}