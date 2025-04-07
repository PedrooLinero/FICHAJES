-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS FICHAJES;

-- Usar la base de datos creada
USE FICHAJES;

-- Crear la tabla con los campos especificados
CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Campo ID único para la tabla
    centro VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    idsap INT NOT NULL,
    trabajador VARCHAR(255) NOT NULL,
    contratos_laborales DECIMAL(5,2) NOT NULL,
    planificadas DECIMAL(5,2),
    realizadas DECIMAL(5,2),
    presencia DECIMAL(5,2),
    absentismo DECIMAL(5,2),
    ausentismo DECIMAL(5,2),
    sindicales DECIMAL(5,2),
    vacaciones DECIMAL(5,2),
    vacaciones_rh DECIMAL(5,2),
    complementarias DECIMAL(5,2),
    especiales DECIMAL(5,2),
    ildi DECIMAL(5,2),
    justificacion VARCHAR(255)
);