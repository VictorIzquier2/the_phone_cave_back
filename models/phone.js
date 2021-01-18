'use strict'

// Modulo
const mongoose = require('mongoose');

// Variable
const Schema = mongoose.Schema;

// Estructura del Modelo
const PhoneSchema = Schema({
  name: {type: String, required: true},
  manufacturer: {type: String, required: true},
  description: {type: String, required: true},
  color: {type: String, required: true},
  price: {type: Number, required: true},
  imageFileName: String,
  screen: {type: String, required: true},
  processor: {type: String, required: true},
  ram: {type: Number, required: true}
});

// Asociar el esquema al modelo para la coleccion
const Phone = mongoose.model('Phone', PhoneSchema);

// Exportar el módulo
module.exports = Phone;
        


