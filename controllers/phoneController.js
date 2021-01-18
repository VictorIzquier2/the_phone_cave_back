'use strict'

// Modulos
const Phone = require('../models/phone');
const fs = require('fs');
const path = require('path');
const { exists } = require('../models/phone');

const phoneController = {

  // Ruta exigida para la API
  telefonos: (req, res) => {
  return res
    .status(200)
    .send(
      [
        {
            "id": 0,
            "name": "iPhone 7",
            "manufacturer": "Apple",
            "description": "iPhone 7 dramatically improves the most important aspects of the iPhone experience. It introduces advanced new camera systems. The best performance and battery life ever in an iPhone. Immersive stereo speakers. The brightest, most colorful iPhone display. Splash and water resistance*. And it looks every bit as powerful as it is. This is iPhone 7.",
            "color": "black",
            "price": 769,
            "imageFileName": "IPhone_7.png",
            "screen": "4,7 inch IPS",
            "processor": "A10 Fusion",
            "ram": 2
        },
        {
            "id": 1,
            "name": "Galaxy S7",
            "manufacturer": "Samsung",
            "description": "Introducing the smartphone your life can not do without, The Samsung Galaxy S7. Packed with features to keep you both productive and entertained, all in a sleek, slim design that fits comfortably in your hand or pocket.",
            "color": "grey",
            "price": 209,
            "imageFileName": "Galaxy_S7.png",
            "screen": "5,1 inch Quad-HD",
            "processor": "Snapdragon 820",
            "ram": 4
        },
        {
            "id": 2,
            "name": "Honor 10",
            "manufacturer": "Huawei",
            "description": "Great phone with an excellent interface. One of the best mid price range phones in the market.",
            "color": "blue",
            "price": 399,
            "imageFileName": "Honor_10.png",
            "screen": "5,84 inch Full-HD",
            "processor": "Kirin 970",
            "ram": 6
        },
        {
            "id": 3,
            "name": "P10 Lite",
            "manufacturer": "Huawei",
            "description": "Great phone with an excellent interface. One of the best mid price range phones in the market.",
            "color": "white",
            "price": 249,
            "imageFileName": "P10_Lite.jpg",
            "screen": "5,2 inch Full-HD",
            "processor": "Kirin 658",
            "ram": 4
        },
        {
            "id": 4,
            "name": "Nokia 7.1",
            "manufacturer": "Nokia",
            "description": "Great phone with an excellent interface. One of the best mid price range phones in the market.",
            "color": "black",
            "price": 275,
            "imageFileName": "Nokia_7.1.jpg",
            "screen": "5,84 inch Full-HD",
            "processor": "Octa-core",
            "ram": 4
        },
        {
            "id": 5,
            "name": "Zen Phone 5",
            "manufacturer": "Asus",
            "description": "Great phone with an excellent interface. One of the best mid price range phones in the market.",
            "color": "black",
            "price": 359,
            "imageFileName": "ZenPhone_5.jpg",
            "screen": "6,2 inch Full-HD",
            "processor": "Snapdragon 636",
            "ram": 6
        },
        {
            "id": 6,
            "name": "MI A2",
            "manufacturer": "Xiaomi",
            "description": "Great phone with an excellent interface. One of the best mid price range phones in the market.",
            "color": "black",
            "price": 179,
            "imageFileName": "Xiaomi_MI_A2.jpeg",
            "screen": "5,99 inch Full-HD",
            "processor": "Snapdragon 660",
            "ram": 6
        },
        {
            "id": 7,
            "name": "Moto G6",
            "manufacturer": "Motorola",
            "description": "Great phone with an excellent interface. One of the best mid price range phones in the market.",
            "color": "black",
            "price": 199,
            "imageFileName": "Moto_G6.png",
            "screen": "5,7 inch Full-HD",
            "processor": "Snapdragon 450",
            "ram": 3
        }
      ]
    )
  },

  // Test
  test: (req, res) => {
    return res
      .status(200)
      .send({
        message: 'Soy la acción test de mi controlador de telefonos'
      })
  },

  guardar: (req, res) => {
    // 1. Recoger parametros por POST
    const params = req.body;
    
    // 2. Validar datos
    if(!params.name || !params.manufacturer ||  !params.description || !params.color || !params.price || !params.screen || !params.processor || !params.ram ){
      return res
        .status(500)
        .send({
          status: 'error',
          message: 'Faltan datos por enviar'
        })
    }else{
      
      // 3. Crear objeto a guardar (Instanciacion)
      const phone = new Phone();
      
      // 4. Asignar valores al objeto
      phone.name = params.name;
      phone.manufacturer = params.manufacturer;
      phone.description = params.description;
      phone.color = params.color;
      phone.price = params.price;
      phone.imageFileName = null;
      phone.screen = params.screen;
      phone.processor = params.processor;
      phone.ram = params.ram;
      
      // 5. Guardar el teléfono
      phone.save((err, phoneStored) => {
        if(err || !phoneStored){

          return res
          .status(404)
          .send({
            status: 'error',
            message: 'El teléfono no se ha guardado en la base de datos'
          });
        }else{

          // 6. Devolver una respuesta
          return res
            .status(200)
            .send({
              status: 'success',
              message: 'Validacion correcta',
              phoneStored
            });
        }
      })
  
    }
 
  },

  telefonosFromDB: (req, res) => {

    let query;
    
    // limitar el número de resultados a 5
    const last = req.params.last;
    if(last){
      query = Phone.find({}).limit(3);
    }else{
      query = Phone.find({})
    }    
    
    // Obtener los telefonos de la base de datos con el método find ordenados de más nuevos a más viejos
    query
      .sort('-_id')
      .exec((err, phonesFromDB) => {
        if(err){
          return res
            .status(500)
            .send({
              status: 'error',
              message: 'Error al cargar los telefonos desde la base de datos', err
            })
        }
        if(phonesFromDB.length < 1){
           return res
            .status(404)
            .send({
              status: 'error',
              message: 'Actualmente no hay teléfonos para mostrar en la base de datos'
            })
        }else{
          return res
            .status(200)
            .send({
              status: 'success',
              message: 'Los teléfonos se han cargado correctamente desde la base de datos',
              phonesFromDB
            })
        }
      })
  },

  telefonoFromDB: (req, res) => {

    // Recoger el ID de la URL
    const phoneId = req.params.id;

    // Validar el ID
    if(!phoneId || phoneId == null){
      return res
        .status(404)
        .send({
          status: 'error',
          message: 'El modelo de teléfono no existe'
        })
    }else{
      // Buscar el artículo
      Phone.findById(phoneId, (err, phoneFromDB) => {
        if(err){
          return res
            .status(500)
            .send({
              status: 'error',
              message: 'Error al acceder a la base de datos'
            })
        }
        if(!phoneFromDB){
          return res
            .status(404)
            .send({
              status: 'error',
              message: 'No se ha podido encontrar el módelo de telefono en la Base de datos'
            })
        }else{
      
          // Devolverlo en un JSON
          return res
            .status(200)
            .send({
              status: 'success',
              message: 'El teléfono se ha cargado correctamente desde la base de datos',
              phoneFromDB
            })
        }
      })
    }

  },

  update: (req, res) => {

    // 1. Recoger el ID del artículo por la URL
    const phoneId = req.params.id;    
     
    // 2. Recoger los datos que llegan por PUT
    const params = req.body;

    // 3. Validar los datos
    if(!params.name || !params.manufacturer ||  !params.description || !params.color || !params.price || !params.screen || !params.processor || !params.ram){
      return res
        .status(500)
        .send({
          status: 'error',
          message: 'Faltan datos por enviar'
        })
    }else{
      // 4. Utilizar el método Find and Update
      Phone.findOneAndUpdate({_id: phoneId}, params, {new: true}, (err, phoneUpdated) => {
        if(err){
          return res
            .status(500)
            .send({
              status: 'error',
              message: 'No se ha podido actualizar el modelo de teléfono'
            })
        }
        if(!phoneUpdated){
          return res
            .status(404)
            .send({
              status: 'error',
              message: 'No se ha encontrado el modelo de teléfono en la base de datos'
            })
        }else{
          return res
            .status(200)
            .send({
              status: 'success',
              message: 'La actualización se ha llevado a cabo con éxito',
              phoneUpdated
            });
        }
      });
    }

  },

  delete: (req, res) => {
    // Recoger el ID de la Utilizar
    const phoneId = req.params.id;

    // Utilizar el método Find and Delete
    Phone.findOneAndDelete({_id: phoneId}, (err, phoneDeleted) => {
      if(err){
        return res
          .status(500)
          .send({
            status: 'error',
            message: 'Error al borrar el modelo de teléfono', err
          });
      }
      if(!phoneDeleted){
        return res
          .status(404)
          .send({
            status: 'error',
            message: 'Ese modelo de teléfono no se encuentra en la base de datos'
          });
      }else{
        return res
          .status(200)
          .send({
            status: 'success',
            message: 'El módelo de teléfono se ha borrado correctamente',
            phoneDeleted
          });
      }
    })
      

  },

  upload: (req, res) => {

    // Configurar el modulo Connect Multiparty router/phoneController.js (hecho)

    // Recoger el fichero de la petición
    const file_message = 'Imagen no subida';
    const image = req.files;

    if(!image){
      return res
        .status(404)
        .send({
          status: 'error',
          message: file_message
        })
    }

    // Conseguir nombre y la extensión del archivo
    const file_path = image.file0.path;

    // En Linux o MAC
    const file_split = file_path.split('/');

    // Nombre del archivo
    const file_name = file_split[2];

    // Extension
    const extension_split = file_name.split('\.');
    const file_ext = extension_split[1];

    // Comprobar la extensión, sólo imágenes, si es válida borrar el fichero
    if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
      // Borrar el archivo subido
      fs.unlink(file_path, (err) => {
        if(err){
          return res
            .status(200)
            .send({
              status: 'error',
              message: 'La extensión de la imagen no es válida'
            });
        }
      });
    }else{
      // Si todo es válido, sacando el ID de la Utilizar
      const phoneId = req.params.id;
  
      // Buscar el modelo de teléfono, asignarle el nombre y la imagen y actualizarlo
      Phone.findOneAndUpdate({_id: phoneId}, {imageFileName: file_name}, {new: true}, (err, phoneUpdated) => {
        if(err || !phoneUpdated){
          return res
            .status(404)
            .send({
              status: 'error',
              message: 'Error al guardar la imagen de artículo', err
            })
        }
        return res
          .status(200)
          .send({
            status: 'success',
            message: 'imagen del modelo de telefóno se ha subido correctamente',
            phoneUpdated
          });
      });
    }
  },

  getImage: (req, res) => {
    const file = req.params.image;

    // Sacar la ruta completa del archivo
    const path_file = './upload/telefonos/' + file;

    // Comprobar si el archivo existe con FS
    fs.exists(path_file, (exists) => {
      if(exists){
        return res
          .sendFile(path.resolve(path_file));
      }else{
        return res
        .status(404)
        .send({
          status: 'error',
          message: 'La imagen no existe'
        })
      }
    });
  },

  search: (req, res) => {
    // Sacar la string a Buscar
    const searchString = req.params.search;

    // Buscar dentro de varios campos con el método Find $or
    Phone.find({ "$or": [
      { "name": { "$regex": searchString, "$options": "i"}},
      { "manufacturer": { "$regex": searchString, "$options": "i"}},
      { "description": { "$regex": searchString, "$options": "i"}},
      { "color": { "$regex": searchString, "$options": "i"}},
      { "screen": { "$regex": searchString, "$options": "i"}},
      { "processor": { "$regex": searchString, "$options": "i"}},      
      
    ]})
    .sort([['price', 'descending']])
    .exec((err, phonesFromDB) => {
      if(err){
        return res
          .status(500)
          .send({
            status: 'error',
            message: 'Se ha producido un error durante la búsqueda',
          });
      }
      if(!phonesFromDB){
        return res
          .status(404)
          .send({
            status: 'error',
            message: 'No existe ningún modelo de telefono que encaje con la descripcion'
          });
      }else{
        return res
          .status(200)
          .send({
            status: 'success',
            message: 'La busqueda se ha realizado correctamente',
            phonesFromDB
          });
      }
    });
  }
}
module.exports = phoneController;