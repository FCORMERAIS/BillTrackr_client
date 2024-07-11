import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import  Client  from "./Client";
import  Facture  from "./Facture";

const Ajouter = () => {
    const [currentPage, setCurrentPage] = useState('tax');
  
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
      <Box sx={{ display: 'flex' }}>
        <Sidebar onMenuItemClick={setCurrentPage} />
        <Container sx={{ padding: 3 }}>
          {renderContent()}
        </Container>
      </Box>
    );
  };

export default Ajouter;  