const express = require("express");
const multer = require("multer");
const router = express.Router();
const FichajesController = require("../controller/fichajesController.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardan los archivos
  },
  filename: function (req, file, cb) {
    // Generar un nombre único con la fecha + nombre original
    const uniqueSuffix = file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Rutas para la gestión de fichajes
router.post("/", upload.single("fichero1"), FichajesController.guardarFicheros);

module.exports = router;
