import React from 'react';
import { Box, Typography } from '@mui/material';

const FactureDetail = ({ facture }) => {
  if (!facture) {
    return <Typography variant="h6">Sélectionnez une facture pour voir les détails.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Détails de la Facture</Typography>
      <Typography variant="body1"><strong>Nom:</strong> {facture.nom}</Typography>
      <Typography variant="body1"><strong>Date d'échéance:</strong> {facture.dateEcheance}</Typography>
      <Typography variant="body1"><strong>Prix Total TTC:</strong> {facture.prixTotalTTC}</Typography>
      <Typography variant="body1"><strong>Remise:</strong> {facture.remises}</Typography>
      {/* Ajoutez d'autres champs de facture si nécessaire */}
    </Box>
  );
};

export default FactureDetail;


