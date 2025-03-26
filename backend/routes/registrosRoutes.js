// backend/routes/fichajesRoutes.js

const express = require("express");
const multer = require("multer");
const router = express.Router();
const registrosController = require("../controller/registrosController");

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
