const express = require("express");
const path = require("path");
const cors = require("cors");
const registrosRoutes = require("./routes/registrosRoutes");
const config = require("./config/config");

const app = express();
const port = process.env.PORT || 3000;

// Configuración CORS mejorada para Electron
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (file://) y desde localhost
      if (
        !origin ||
        origin.startsWith("file://") ||
        origin.includes("localhost")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas estáticas y uploads
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// Configuración específica por entorno
if (process.env.NODE_ENV !== "production") {
  console.log("Modo desarrollo activado");
  app.use(express.static(path.resolve(__dirname, "public/dev")));
} else {
  console.log("Modo producción activado");
  app.use(express.static(path.resolve(__dirname, "public/prod")));
}

// Rutas API
app.use("/api/registros", registrosRoutes);

// Manejo de rutas del frontend (React Router)
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      process.env.NODE_ENV !== "production"
        ? "public/dev/index.html"
        : "public/prod/index.html"
    )
  );
});

// Iniciar servidor con manejo para Electron
if (true || process.env.NODE_ENV !== "test") {
  // const server = app.listen(config.port, () => {
  //   console.log(`Servidor escuchando en el puerto ${config.port}`);

  //   // Notificar a Electron si es necesario
  //   if (process.send) {
  //     process.send('server-ready');
  //   }
  // });

  const server = app.listen(port, "127.0.0.1", () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${port}`);

    //   // Notificar a Electron si es necesario
    if (process.send) {
      process.send("server-ready");
    }
  });

  // Manejo de errores del servidor
  server.on("error", (error) => {
    console.error("Error del servidor:", error);
  });
}

module.exports = app;
