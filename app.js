'use strict'

// 1. Cargar módulos de node para crear el servidor
const express = require('express');
const bodyParser = require('body-parser');

// 2. Ejectutar Express (HTTP)
const app = express();

// 3. Cargar fichero para las Rutas
const phoneRoutes = require('./routes/phoneRoutes');

// 4. Configuramos los middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 5. CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// 6. Añadir prefijos a las rutas / Cargar rutas
app.use('/api', phoneRoutes)

// 7. Exportar modulo (Fichero actual)
module.exports = app;

