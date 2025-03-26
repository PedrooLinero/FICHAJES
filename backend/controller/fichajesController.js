// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo fichajes
const Fichajes = models.fichajes;

class FichajesController{

    async guardarFicheros(req, res) {

        const fichero1 = req.file ? req.file.filename : null;

        console.log(fichero1);
    }

}

module.exports = FichajesController;