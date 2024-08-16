
const { response } = require('express');

const Mesa = require('../models/mesa');

const getMesas = async (req, res = response) => {

    const mesas = await Mesa.find()
                            .populate('usuario','nombre email');

    res.json({
        ok: true,
        mesas
    });
}

const crearMesa = async (req, res = response) => {

    const uid = req.uid;
    const mesa = new Mesa({
        usuario: uid,
        ...req.body
    });

    try {

        const mesaDB = await mesa.save();

        res.json({
            ok: true,
            mesa: mesaDB
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la mesa'
        });
    }

}

const actualizarMesa = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMesa'
    });
}

const borrarMesa = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMesa'
    });
}

module.exports = {
    getMesas,
    crearMesa,
    actualizarMesa,
    borrarMesa
}