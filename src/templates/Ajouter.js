import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import  Client  from "./Client";
import  Facture  from "./Facture";
import '@fontsource/archivo-black';

const Ajouter = () => {
  const [currentPage, setCurrentPage] = useState('facture');

  const renderContent = () => {
    switch (currentPage) {
      case 'facture':
        return <Facture />;
      case 'client':
        return <Client />;
      default:
        return <Facture />;
    }
  };

  return (
    <Box>
       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          onClick={() => setCurrentPage('facture')}
          sx={{
            cursor: 'pointer',
            padding: '10px 20px',
            borderBottom: currentPage === 'facture' ? '3px solid #1976d2' : 'none',
            fontFamily: 'Archivo Black, sans-serif'
          }}
        >
          Facture
        </Typography>
        <Typography
          variant="h6"
          onClick={() => setCurrentPage('client')}
          sx={{
            cursor: 'pointer',
            padding: '10px 20px',
            borderBottom: currentPage === 'client' ? '3px solid #1976d2' : 'none',
            fontFamily: 'Archivo Black, sans-serif'
          }}
        >
          Client
        </Typography>
      </Box>

      {/* Contenu Dynamique */}
      <Container sx={{ padding: 3 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default Ajouter;
