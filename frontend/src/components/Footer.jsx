// src/components/Footer.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#333', color: 'white', padding: '20px 0'}}>
      <Container maxWidth="xl">
        <Typography variant="body2" align="center">
          © 2025 Tu Empresa. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
