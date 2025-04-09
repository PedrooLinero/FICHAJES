const path = require("path");
const { app, BrowserWindow } = require("electron");
const { fork } = require("child_process");

let mainWindow;
let backendProcess;

function createWindow() {
  // Detectar la ruta correcta del backend
  const backendScript =
    process.env.NODE_ENV === "development"
      ? path.join(__dirname, "../FICHAJES/backend/index.js") // Ruta en desarrollo
      : path.join(process.resourcesPath, "app", "backend", "index.js"); // Ruta en producción

  console.log("Ejecutando backend desde:", backendScript);

  // Iniciar el backend como un proceso hijo
  backendProcess = fork(backendScript, {
    cwd: path.dirname(backendScript), // Asegurar que el backend se ejecuta en su carpeta
  });

  backendProcess.on("error", (err) => {
    console.error("Error al iniciar el backend:", err);
  });

  backendProcess.on("exit", (code, signal) => {
    console.log(`El backend se cerró con código: ${code}, señal: ${signal}`);
  });

  // Detectar la ruta correcta del icono
  const iconPath =
    process.env.NODE_ENV === "development"
      ? path.join(__dirname, "../resources/custom-icon.ico") // Ruta en desarrollo
      : path.join(process.resourcesPath, "app", "resources", "custom-icon.ico"); // Ruta en producción

  console.log("Usando icono desde:", iconPath);

  // Verificar si el archivo existe (para depuración)
  const fs = require("fs");
  if (!fs.existsSync(iconPath)) {
    console.error("El archivo de icono no existe en la ruta:", iconPath);
  }

  // Crear la ventana de Electron
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath, // Añadir el icono aquí
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    const prodPath = path.join(
      process.resourcesPath,
      "app",
      "backend",
      "public",
      "prod",
      "index.html"
    );
    console.log("Cargando frontend desde:", prodPath);
    mainWindow.loadFile(prodPath);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Cerrar backend cuando se cierre la app
app.on("window-all-closed", () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
