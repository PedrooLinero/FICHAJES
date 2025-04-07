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
const { log, Console } = require("console");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo fichajes
const Registros = models.registros;

class registrosController {
  //conversor de fecha
  static formatExcelDate(excelSerialDate) {
    const utcDays = excelSerialDate - 25569;
    const utcMillis = utcDays * 86400000;
    const date = new Date(utcMillis);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  // Método para leer ficheros
  static leerExcel(nombreFichero) {
    console.log("Ha entrado en leerExcel");

    try {
      // Subir un nivel desde el directorio "controller" para llegar a "backend"
      const filePath = path.join(__dirname, "../uploads/", nombreFichero);

      console.log("Ha entrado en filePath", filePath);

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

    console.log("Fichero 1:", fichero1);
    console.log("Fichero 2:", fichero2);

    if (!fichero1 && !fichero2) {
      return res.status(400).json({ message: "Se debe subir varios ficheros" });
    }

    try {
      // Llamar al método para leer el Excel y obtener los datos
      const excelData1 = registrosController.leerExcel(fichero1);
      const excelData2 = registrosController.leerExcel(fichero2);

      console.log("Datos del primer Excel:", excelData1);
      console.log("Datos del segundo Excel:", excelData2);

      let excel2 = [];

      let resultado = [];

      for (let i = 5; i < excelData2.length; i++) {
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
          Total_planificado: excelData2[i]["__EMPTY_10"],
          Tabla_vacia: excelData2[i]["__EMPTY_11"],
          Estado: excelData2[i]["__EMPTY_12"],
          Tabla_vacia: excelData2[i]["__EMPTY_13"],
          Acción_Realizada: excelData2[i]["__EMPTY_14"],
          Usuario: excelData2[i]["__EMPTY_15"],
          Fecha_hora: excelData2[i]["__EMPTY_16"],
          Terminal: excelData2[i]["__EMPTY_17"],
        });
      }

      let coincidencia = false;

      for (let i = 0; i < excelData1.length; i++) {
        let real = "";
        let planificado = "";
        coincidencia = false;

        const filaExcel1 = excelData1[i];

        let trabajador = String(filaExcel1.Trabajador).split("-");
        let idsap = trabajador[0].trim();

        // Verifica si la propiedad Fecha existe y es un número
        if (typeof filaExcel1?.Fecha !== "number") {
          continue;
        }

        for (let j = 0; j < excel2.length; j++) {
          const filaExcel2 = excel2[j];

          if (
            filaExcel2?.Fecha === filaExcel1.Fecha &&
            filaExcel2?.Centro === filaExcel1.Centro &&
            filaExcel2?.IDSAP === idsap
          ) {
            real = filaExcel2?.Real;
            planificado = filaExcel2?.Planificado;
            coincidencia = true;
            break;
          }
        }

        if (coincidencia == false) {
          resultado.push({
            Centro: filaExcel1.Centro,
            Trabajador: filaExcel1.Trabajador,
            Fecha: registrosController.formatExcelDate(filaExcel1.Fecha),
            Contratos_Laborales: decimalAHorasMinutos(
              filaExcel1["Contratos Laborales"]
            ),
            Complem: decimalAHorasMinutos(filaExcel1["Complem."]),
            Especiales: decimalAHorasMinutos(filaExcel1.Especiales),
            Absentismo: decimalAHorasMinutos(filaExcel1.Absentismo),
            Ausentismo: decimalAHorasMinutos(filaExcel1.Ausentismo),
            Sindicales: decimalAHorasMinutos(filaExcel1.Sindicales),
            Vacaciones: decimalAHorasMinutos(filaExcel1.Vacaciones),
            Vacaciones_RH: decimalAHorasMinutos(filaExcel1["Vacaciones RH"]),
            Presencia_Esperada: decimalAHorasMinutos(
              filaExcel1["Presencia Esperada"]
            ),
            Real: "",
            Presencia_Fichaje: decimalAHorasMinutos(
              filaExcel1["Presencia Fichaje"]
            ),
            "Pres.Esp. - Pres.Fichaje": decimalAHorasMinutos(
              filaExcel1["Pres.Esp. - Pres.Fichaje"]
            ),
            "% Presencia vs Contr.-Aus.": convertirPorcentaje(
              filaExcel1["% Presencia vs Contr.-Aus."]
            ),
            Planificadas: decimalAHorasMinutos(filaExcel1.Planificadas),
            Planificado: "",
            "Trabajo Efectivo": decimalAHorasMinutos(
              filaExcel1["Trabajo Efectivo"]
            ),
          });
        } else {
          resultado.push({
            Centro: filaExcel1.Centro,
            Trabajador: filaExcel1.Trabajador,
            Fecha: registrosController.formatExcelDate(filaExcel1.Fecha),
            Contratos_Laborales: decimalAHorasMinutos(
              filaExcel1["Contratos Laborales"]
            ),
            Complem: decimalAHorasMinutos(filaExcel1["Complem."]),
            Especiales: decimalAHorasMinutos(filaExcel1.Especiales),
            Absentismo: decimalAHorasMinutos(filaExcel1.Absentismo),
            Ausentismo: decimalAHorasMinutos(filaExcel1.Ausentismo),
            Sindicales: decimalAHorasMinutos(filaExcel1.Sindicales),
            Vacaciones: decimalAHorasMinutos(filaExcel1.Vacaciones),
            Vacaciones_RH: decimalAHorasMinutos(filaExcel1["Vacaciones RH"]),
            Presencia_Esperada: decimalAHorasMinutos(
              filaExcel1["Presencia Esperada"]
            ),
            Real: real,
            Presencia_Fichaje: decimalAHorasMinutos(
              filaExcel1["Presencia Fichaje"]
            ),
            "Pres.Esp. - Pres.Fichaje": decimalAHorasMinutos(
              filaExcel1["Pres.Esp. - Pres.Fichaje"]
            ),
            "% Presencia vs Contr.-Aus.": convertirPorcentaje(
              filaExcel1["% Presencia vs Contr.-Aus."]
            ),
            Planificadas: decimalAHorasMinutos(filaExcel1.Planificadas),
            Planificado: planificado,
            "Trabajo Efectivo": decimalAHorasMinutos(
              filaExcel1["Trabajo Efectivo"]
            ),
          });
        }
      }

      // Crear un nuevo libro de Excel
      const workbook = XLSX.utils.book_new();

      // Convertir el array de objetos a una hoja de cálculo
      const worksheet = XLSX.utils.json_to_sheet(resultado);

      XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
      });

      //Configurar headers para descarga
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=resultado.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.send(excelBuffer);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      res.status(500).json({ message: "Error al procesar el archivo Excel." });
    }
  }
}

function decimalAHorasMinutos(input) {
  if (typeof input === "number") {
    const esNegativo = input < 0;
    const valorAbsoluto = Math.abs(input);

    const horas = Math.floor(valorAbsoluto);
    const minutos = Math.round((valorAbsoluto - horas) * 60);

    const horasStr = horas.toString().padStart(2, "0");
    const minutosStr = minutos.toString().padStart(2, "0");

    return `${esNegativo ? "-" : ""}${horasStr}:${minutosStr}`;
  }

  if (typeof input === "string" && input.includes(":")) {
    const [horasStr, minutosStr] = input.split(":");
    const horas = parseInt(horasStr);
    const minutos = parseInt(minutosStr);

    // Validar formato correcto
    if (!isNaN(horas) && !isNaN(minutos) && minutos >= 0 && minutos < 60) {
      return input;
    }
  }

  throw new Error(`Formato de hora no reconocido: ${input}`);
}

function convertirPorcentaje(input) {
  if (typeof input === "number") {
    let porcentaje = (input * 100).toString();

    const partes = porcentaje.split(".");
    if (partes[1] && partes[1].length > 2) {
      porcentaje = partes[0] + "." + partes[1].substring(0, 2);
    }

    return `${porcentaje}%`;
  }

  if (typeof input === "string" && input.includes("%")) {
    const valorSinPorcentaje = input.replace("%", "").trim();
    const numero = parseFloat(valorSinPorcentaje);

    if (!isNaN(numero)) {
      // Devuelve el string original si ya es porcentaje válido
      return input;
    }
  }

  if (typeof input === "string" && !isNaN(parseFloat(input))) {
    const numero = parseFloat(input) * 100;
    return `${numero}%`;
  }

  throw new Error(`Formato no reconocido: ${input}`);
}

module.exports = registrosController;
