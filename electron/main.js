const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('../backend/index.js'); // Importamos tu servidor Express
 
let mainWindow;
 
function createWindow() {
  // Crear la ventana del navegador.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
 
  // Cargar la aplicación React
  if (process.env.NODE_ENV === 'development') {
    // En desarrollo, cargar desde el servidor de React
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    // Abrir las herramientas de desarrollo.
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, cargar el archivo build
    mainWindow.loadFile(path.join(__dirname, '../backend/public/prod/index.html'));
  }
 
  // Evento cuando la ventana es cerrada.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
 
// Este método será llamado cuando Electron haya terminado de inicializarse.
app.on('ready', createWindow);
 
// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
 
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});