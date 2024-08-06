require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express 
const app = express();

// Configurar CORS 
app.use(cors());

// Base de datos 

dbConnection();

//console.log (process.env);

//elecciones_user
//0QPD7HWqC5smll88

// Rutas 
app.get( '/' , (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});