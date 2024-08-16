const { Schema, model } = require('mongoose');

const MesaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    fusionada: {
        type: String
    },
    circunscripcion: {
        type: String,
        required: true
    },
    comuna: {
        type: String, 
        required: true
    },
    provincia: {
        type: String
    },
    region: {
        type: String
    },
    numregion: {
        type: Number
    },
    img:{
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
}, { collection: 'mesas' });

MesaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Mesa', MesaSchema );