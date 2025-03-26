// backend/controller/fichajesController.js

const path = require("path");
const fs = require("fs");
// importar librería para manejo de ficheros
const XLSX = require("xlsx");
// Importar librería para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
const { log } = require("console");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo fichajes
const Registros = models.registros;

class registrosController {

  // Método para leer ficheros
  static leerExcel(nombreFichero) {
    try {
      // Ruta del archivo subido
      const filePath = path.join(__dirname, "uploads", nombreFichero);
  
      // Leer el archivo Excel
      const workbook = XLSX.readFile(filePath);
  
      // Obtener la primera hoja de trabajo (puedes modificarlo para obtener la hoja que necesites)
      const sheetName = workbook.SheetNames[0];  // Nombre de la primera hoja
      const sheet = workbook.Sheets[sheetName];
  
      // Convertir la hoja a un JSON (esto te da los datos como un array de objetos)
      const data = XLSX.utils.sheet_to_json(sheet);
  
      // Responder con los datos obtenidos
      // res.json(data);
      console.log(data);
    } catch (error) {
      console.error("Error al leer el archivo Excel:", error);
      // res.status(500).json({ message: "Error al leer el archivo Excel." });
    }
  }

  static async guardarFicheros(req, res) {
    const fichero1 = req.file ? req.file.filename : null;
    console.log(fichero1);

    if (!fichero1) {
      return res.status(400).json({ message: "No se ha subido ningún archivo" });
    }

    try {
      // Llamar al método para leer el Excel y obtener los datos
      const excelData = registrosController.leerExcel(fichero1);

      // Aquí puedes hacer lo que necesites con los datos leídos, por ejemplo, guardarlos en la base de datos.
      console.log("Datos leídos del Excel:", excelData);

      // Responder con los datos del archivo
      res.status(200).json({
        mensaje: "Fichero recibido y procesado con éxito",
        datos: excelData,
      });
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      res.status(500).json({ message: "Error al procesar el archivo Excel." });
    }

    // Aquí puedes agregar la lógica para guardar el fichero, si es necesario
    // res.status(200).json({ mensaje: "Fichero recibido", fichero: fichero1 });
  }
}

module.exports = registrosController;
