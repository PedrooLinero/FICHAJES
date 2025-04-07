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
      <Box sx={{ height: "72vh" }}>
        <Typography variant="h4" align="center" sx={{ margin: 3 }}>
          Insertar archivos
        </Typography>

        <Paper sx={{ padding: 4, boxShadow: 3 }}>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              {/* Fichero 1 */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight: "700"}}>
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
                />
              </Grid>

              {/* Fichero 2 */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight: "700"}}>
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
                />
              </Grid>
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "left", marginLeft: 1 }}
            >
              <Button variant="contained" color="primary" type="submit" sx={{marginTop: 2, marginLeft: 3}}>
                Descargar excel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default CargarArchivos;
