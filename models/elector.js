const { Schema, model } = require('mongoose');

const ElectorSchema = Schema({
    run: {
        type: Number,
        required: true,
        unique: true
    },
    dv: {
        type: Number,
        required: true
    },
    nombreCompleto: {
        type: String,
        required: true
    },
    sexo: {
        type: Number
    },
    domicilioElectoral: {
        type: String
    },
    comuna: {
        type: String,
        required: true
    },
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    },
    img:{
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mesa: {
        type: Schema.Types.ObjectId,
        ref: 'Mesa',
        required: true
    }
}, { collection: 'electores' });

ElectorSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Elector', ElectorSchema );