require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express 
const app = express();

// Configurar CORS 
app.use(cors());

// Carpeta pública 
app.use( express.static('public') );

// Lectura y parseo del body 
app.use( express.json() );

// Base de datos 

dbConnection();

//console.log (process.env);

// Rutas 
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mesas', require('./routes/mesas'));
app.use('/api/electores', require('./routes/electores'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});