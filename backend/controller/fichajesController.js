// backend/controller/fichajesController.js

// Importar librería para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo fichajes
const Registros = models.registros;

class FichajesController {
  static async guardarFicheros(req, res) {
    const fichero1 = req.file ? req.file.filename : null;
    console.log(fichero1);
    // Aquí puedes agregar la lógica para guardar el fichero, si es necesario
    res.status(200).json({ mensaje: "Fichero recibido", fichero: fichero1 });
  }
}

module.exports = FichajesController;
