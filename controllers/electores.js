
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

const actualizarElector = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const elector = await Elector.findById( id );

        if ( !elector ){
            return res.status(404).json({
                ok: true,
                msg: 'Elector no encontrado por ID'
            });
        }

        // Actualizaciones 
        const { run, ...campos } = req.body;

        if ( elector.run !== run ) {
            const existeRun = await Elector.findOne({ run });
            if ( existeRun ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un elector con ese RUN'
                });
            }
        }

        const cambiosElector = {
            ...req.body,
            usuario: uid
        }

        const electorActualizado = await Elector.findByIdAndUpdate( id, cambiosElector, { new: true } );

        res.json({
            ok: true,
            msg: 'El elector ha sido actualizado',
            elector: electorActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el elector'
        });        
    }

}

const borrarElector = async (req, res = response) => {

    const id = req.params.id;

    try {

        const elector = await Elector.findById( id );

        if ( !elector ){
            return res.status(404).json({
                ok: false,
                msg: 'Elector no encontrado por ID'
            });
        }

        await Elector.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'El elector ha sido eliminado'
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el elector'
        });
    }

}

module.exports = {
    getElectores,
    crearElector,
    actualizarElector,
    borrarElector
}