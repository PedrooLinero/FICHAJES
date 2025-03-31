// backend/routes/fichajesRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const registrosController = require("../controller/registrosController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ruta a la carpeta 'uploads' dentro de 'public/prod'
    const uploadPath = path.join(__dirname, "..", 'public', 'prod', 'uploads');
    cb(null, uploadPath);  // Establecer la ruta de destino
  },
  filename: function (req, file, cb) {
    // Generar un nombre único con la fecha + nombre original
    const uniqueSuffix = file.originalname;
    cb(null, uniqueSuffix);  // Nombre del archivo guardado
  },
});

const upload = multer({ storage });

// router.post("/", upload.single("fichero1"), registrosController.guardarFicheros);
router.post(
  "/",
  upload.fields([
    { name: "fichero1", maxCount: 1 },
    { name: "fichero2", maxCount: 1 },
  ]),
  registrosController.guardarFicheros
);

module.exports = router;
