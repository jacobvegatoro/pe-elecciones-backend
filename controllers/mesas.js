
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

const actualizarMesa = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const mesa = await Mesa.findById( id );

        if ( !mesa ){
            return res.status(404).json({
                ok: false,
                msg: 'Mesa no encontrada por ID'
            });
        }

        const cambiosMesa = {
            ...req.body,
            usuario: uid
        }

        const mesaActualizada = await Mesa.findByIdAndUpdate( id, cambiosMesa, { new: true } );

        res.json({
            ok: true,
            msg: 'La mesa ha sido actualizada',
            mesa: mesaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la mesa'
        });
            
    }

}

const borrarMesa = async (req, res = response) => {

    const id = req.params.id;

    try {

        const mesa = await Mesa.findById( id );

        if ( !mesa ){
            return res.status(404).json({
                ok: false,
                msg: 'Mesa no encontrada por ID'
            });
        }

        await Mesa.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'La mesa ha sido eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la mesa'
        });
            
    }    
}

module.exports = {
    getMesas,
    crearMesa,
    actualizarMesa,
    borrarMesa
}