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
      // Subir un nivel desde el directorio "controller" para llegar a "backend"
      const filePath = path.join(__dirname, "..", "uploads", nombreFichero);

      // Leer el archivo Excel
      const workbook = XLSX.readFile(filePath);

      // Obtener la primera hoja de trabajo
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convertir la hoja a JSON
      const data = XLSX.utils.sheet_to_json(sheet);

      return data;
    } catch (error) {
      console.error("Error al leer el archivo Excel:", error);
      throw new Error("Error al leer el archivo Excel.");
    }
  }

  static async guardarFicheros(req, res) {
    const fichero1 = req.files["fichero1"]
      ? req.files["fichero1"][0].filename
      : null;
    const fichero2 = req.files["fichero2"]
      ? req.files["fichero2"][0].filename
      : null;
    console.log(fichero1);
    console.log(fichero2);

    if (!fichero1 && !fichero2) {
      return res.status(400).json({ message: "Se debe subir varios ficheros" });
    }

    try {
      // Llamar al método para leer el Excel y obtener los datos
      const excelData1 = registrosController.leerExcel(fichero1);
      const excelData2 = registrosController.leerExcel(fichero2);

      // Aquí puedes hacer lo que necesites con los datos leídos, por ejemplo, guardarlos en la base de datos.
      console.log("Datos leídos del Excel1:", excelData1);
      let excel2 = [];
      for (let i = 5; i < excelData2.length; i++) {
        // console.log("Datos leídos del Excel2:", excelData2[i]);

        excel2.push({
          Centro: excelData2[i]["__EMPTY_4"],
          Fecha: excelData2[i]["__EMPTY_1"],
          IDSAP: excelData2[i]["__EMPTY_2"],
          Trabajador: excelData2[i]["__EMPTY_3"],
          Grupo: excelData2[i]["__EMPTY_5"],
          Parte: excelData2[i]["__EMPTY_6"],
          Planificado: excelData2[i]["__EMPTY_7"],
          Dato_no_conocido: excelData2[i]["__EMPTY_8"],
          Real: excelData2[i]["__EMPTY_9"],
          Dato_no_conocido: excelData2[i]["__EMPTY_10"],
          Tabla_vacia: excelData2[i]["__EMPTY_11"],
          Estado: excelData2[i]["__EMPTY_12"],
          Tabla_vacia: excelData2[i]["__EMPTY_13"],
          Acción_Realizada: excelData2[i]["__EMPTY_14"],
          Usuario: excelData2[i]["__EMPTY_15"],
          Fecha_hora: excelData2[i]["__EMPTY_16"],
          Terminal: excelData2[i]["__EMPTY_17"],
        });
      }

      console.log(excel2);

      // Responder con los datos del archivo
      res.status(200).json({
        mensaje: "Fichero recibido y procesado con éxito",
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
