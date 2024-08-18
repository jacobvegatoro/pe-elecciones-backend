const { response } = require('express');

const Usuario = require('../models/usuario');
const Mesa = require('../models/mesa');
const Elector = require('../models/elector');

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, mesas, electores ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Mesa.find({ nombre: regex }),
        Elector.find({ nombreCompleto: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        mesas, 
        electores
    });
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case 'electores':
            data = await Elector.find({ nombreCompleto: regex })
                                .populate('mesa','nombre circunscripcion comuna')
                                .populate('usuario','nombre email');
        break;

        case 'mesas':
            data = await Mesa.find({ nombre: regex })
                                .populate('usuario','nombre email');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla ingresada no es válida'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}