import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
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
    console.log(formData);
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.fichero1 && formData.fichero2) {
      formDataToSend.append("fichero1", formData.fichero1);
      formDataToSend.append("fichero2", formData.fichero2);
    }

    try {
      const response = await fetch(apiUrl + "/registros/", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
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

  const handleFileChange1 = (e) => {
    setFormData({ ...formData, fichero1: e.target.files[0] });
  };

  const handleFileChange2 = (e) => {
    setFormData({ ...formData, fichero2: e.target.files[0] });
  };

  return (
    <>
      <Box sx={{height: "80vh"}}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
          Cargar Archivos
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
                <Typography variant="subtitle1" gutterBottom>
                  Fichero 1
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
                />
              </Grid>

              {/* Fichero 2 */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Fichero 2
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
                />
              </Grid>
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            >
              <Button variant="contained" color="primary" type="submit">
                Cargar Archivos
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default CargarArchivos;
