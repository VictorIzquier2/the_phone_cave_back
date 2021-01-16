'use strict'

// 1. Instalar npm (Gestor de dependencias)
// 2. Instalar Express (Enrutamiento)
// 3. Instalar body-parser (Objetos JSON)
// 4. Instalar Mongoose (Métodos para DB)
// 5. Instalar Multiparty (Subir archivos)
// 6. Instalar Nodemon (Actualizar Back)

const mongoose = require('mongoose');
const app = require('./app');
const PORT = 3900;

// Forzar nuevos métodos de mongoose
mongoose.set('useFindAndModify', false);

// Implementar promesas con MongoDB
mongoose.Promise = global.Promise;

// Conexion a la base de datos con MongoDB
mongoose.connect('mongodb://localhost:27017/the_phone_cave', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('La conexion a la base de datos se ha realizado correctamente')

    // Crear servidor y escuchar peticiones HTTP
    app.listen(PORT, () => {
      console.log('Servidor corriendo en http://localhost:'+ PORT);
    })
  });