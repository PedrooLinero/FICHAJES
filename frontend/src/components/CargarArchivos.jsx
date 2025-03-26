import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function CargarArchivos() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fichero1: null,
    fichero2: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData
    const formDataToSend = new FormData();

    // // Agregar los campos al FormData
    // formDataToSend.append("correo", formData.correo);
    // formDataToSend.append("contrasena", formData.contrasena);
    // formDataToSend.append("nombre", formData.nombre);
    // formDataToSend.append("edad", formData.edad);
    // formDataToSend.append("posicion", formData.posicion);
    // formDataToSend.append("numero_camiseta", formData.numero_camiseta);
    // formDataToSend.append(
    //   "fecha_ingreso",
    //   formData.fecha_ingreso.toISOString()
    // ); // Convertir fecha a string
    // formDataToSend.append("estado", formData.estado);
    // formDataToSend.append("idclub", formData.idclub);

    // Agregar la imagen si existe
    if (formData.fichero1) {
      formDataToSend.append("fichero1", formData.fichero1);
    }

    try {
      const response = await fetch(apiUrl + "/fichajes/", {
        method: "POST",
        body: formDataToSend, // Enviar el FormData
        credentials: "include", // Para aceptar cookies en la respuesta y enviarlas si las hay
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje);
        navigate("/");
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      alert("Error de red. Inténtalo de nuevo más tarde.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Nueva función para manejar la imagen
  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  return (
    <>
      <h1>Cargar archivos</h1>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p>Fichero 1</p>
        <TextField
          id="fichero1"
          variant="outlined"
          type="file"
          name="fichero1"
          onChange={handleFileChange} // Usa la nueva función para manejar archivos
        />
        <p>Fichero 2</p>
        <TextField
          id="fichero2"
          variant="outlined"
          type="file"
          name="fichero2"
          onChange={handleFileChange} // Usa la nueva función para manejar archivos
        />
        <Button variant="outlined" type="submit">
          Cargar archivos
        </Button>
      </Box>
    </>
  );
}

export default CargarArchivos;
