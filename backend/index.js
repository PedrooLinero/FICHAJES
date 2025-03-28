// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const registrosRoutes = require("./routes/registrosRoutes");
// const artistaRoutes = require("./routes/artistaRoutes");
// const pedidoRoutes = require("./routes/pedidoRoutes");

// Importar configuración
const config = require("./config/config");

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
// app.use(cors());

if (process.env.NODE_ENV !== "production") {
  // Configurar CORS para admitir el origen del frontend en desarrollo
  app.use(
    cors({
      origin: "http://localhost:5173", // Permitir el frontend en desarrollo de React // Permitir el frontend en desarrollo de React Native
      credentials: true, // Permitir envío de cookies
    })
  );
}

// Configurar rutas de la API Rest
app.use("/api/registros", registrosRoutes);
// app.use("/api/artistas", artistaRoutes);

if (process.env.NODE_ENV !== "production") {
  console.log("Sirviendo ficheros de desarrollo");
  // Configurar el middleware para servir archivos estáticos desde el directorio public/dev en desarrollo
  app.use(express.static(path.join(__dirname, "public/dev")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/dev", "index.html"));
  });
} else {
  console.log("Sirviendo ficheros de producción");
  // Configurar el middleware para servir archivos estáticos desde el directorio public/dev en producción
  app.use(express.static(path.join(__dirname, "public/prod")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/prod", "index.html"));
  });
}

// // Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
// app.use(express.static(path.join(__dirname, "public","old_js_vainilla")));

// Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "old_js_vainilla","index.html"));
// });

// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
  });
}
// Exportamos la aplicación para poder hacer pruebas
module.exports = app;
