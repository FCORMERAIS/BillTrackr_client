import React, { useState } from 'react';
import { Box } from '@mui/material';
import SidebarCreate from './SidebarListing';
import FactureDetail from './FactureDetail';

const ListeFacture = () => {
  const [selectedFacture, setSelectedFacture] = useState(null);

  const handleInvoiceClick = (facture) => {
    setSelectedFacture(facture);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarCreate onInvoiceClick={handleInvoiceClick} />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <FactureDetail facture={selectedFacture} />
      </Box>
    </Box>
  );
};

export default ListeFacture;
