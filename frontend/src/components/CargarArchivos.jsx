import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function CargarArchivos() {
  const [formData, setFormData] = useState({
    fichero1: null,
    fichero2: null,
  });

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.fichero1 && formData.fichero2) {
      formDataToSend.append("fichero1", formData.fichero1);
      formDataToSend.append("fichero2", formData.fichero2);
    }

    try {
      const response = await fetch(apiUrl + "/registros", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resultado.xlsx"; // Nombre del archivo
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error de red. Inténtalo de nuevo más tarde.");
    }
  };

  const handleFileChange1 = (e) => {
    setFormData({ ...formData, fichero1: e.target.files[0] });
  };

  const handleFileChange2 = (e) => {
    setFormData({ ...formData, fichero2: e.target.files[0] });
  };

  return (
    <>
      <Box
        sx={{
          height: "72vh",
          display: "flex", // Centrar vertical y horizontalmente
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            padding: 6, // Aumentar el padding para más espacio interno
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Sombra suave
            borderRadius: 3, // Bordes redondeados
            maxWidth: 1000, // Aumentar el ancho máximo para hacer la caja más grande
            width: "100%", // Responsivo
            backgroundColor: "#ffffff", // Fondo blanco para el Paper
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              marginBottom: 4, // Más espacio debajo del título
              fontWeight: "bold",
              color: "#333", // Color más oscuro para el título
            }}
          >
            Insertar Archivos
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={4} justifyContent="center">
              {/* Fichero 1 */}
              <Grid item xs={12} sm={5}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontWeight: "700",
                    color: "#555", // Color más suave para los subtítulos
                  }}
                >
                  PowerBI:
                </Typography>
                <TextField
                  id="fichero1"
                  variant="outlined"
                  type="file"
                  fullWidth
                  onChange={handleFileChange1}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{
                    backgroundColor: "#fafafa", // Fondo claro para el campo
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ddd", // Borde más suave
                      },
                      "&:hover fieldset": {
                        borderColor: "#888", // Borde al pasar el ratón
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976d2", // Borde al enfocar
                      },
                    },
                  }}
                />
              </Grid>

              {/* Fichero 2 */}
              <Grid item xs={12} sm={5}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontWeight: "700",
                    color: "#555",
                  }}
                >
                  SIGGA:
                </Typography>
                <TextField
                  id="fichero2"
                  variant="outlined"
                  type="file"
                  fullWidth
                  onChange={handleFileChange2}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{
                    backgroundColor: "#fafafa",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#888",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976d2",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // Centrar el botón
                marginTop: 4, // Más espacio arriba del botón
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  padding: "10px 30px", // Botón más grande
                  borderRadius: 2, // Bordes redondeados
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Sombra suave
                  textTransform: "none", // Sin mayúsculas automáticas
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#1565c0", // Color más oscuro al pasar el ratón
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Sombra más pronunciada
                  },
                }}
              >
                Descargar Excel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default CargarArchivos;
