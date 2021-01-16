'use strict'

// Modulos
const express = require('express');
const phoneController = require('../controllers/phoneController');
const multipart = require('connect-multiparty');

// Variables
const router = express.Router();

// Middlewares
const md_upload = multipart({ uploadDir: './upload/telefonos'})

// Direccion de prueba
router.get('/test-de-controlador', phoneController.test);

// Direccion exigida para la API
router.get('/telefonos', phoneController.telefonos);

// Direcciones
router.post('/guardar', phoneController.guardar);
router.get('/telefonos-from-db/:last?', phoneController.telefonosFromDB)
router.get('/telefono-from-db/:id', phoneController.telefonoFromDB)
router.put('/telefono-from-db/:id', phoneController.update);
router.delete('/telefono-from-db/:id', phoneController.delete);
router.post('/upload-image/:id', md_upload, phoneController.upload);
router.get('/get-image/:image', phoneController.getImage);
router.get('/search/:search', phoneController.search);


// Exportando las rutas como modelo
module.exports = router;