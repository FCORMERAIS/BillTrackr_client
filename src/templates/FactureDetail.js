import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import PDFViewer from './PDFViewer';

const FactureDetail = ({ facture, onDelete }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        if (facture) {
          const response = await axios.post('http://172.31.32.102:3001/get_pdf', { factureId: facture.id });
          setPdfUrl(response.data.pdfUrl);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [facture]);

  if (!facture) {
    return <Typography variant="h6">Sélectionnez une facture pour voir les détails.</Typography>;
  }

  if (loading) {
    return <Typography variant="h6">Chargement des détails de la facture...</Typography>;
  }

  const handleDelete = async () => {
    try {
      const response = await axios.post('http://172.31.32.102:3001/delete_facture', { factureId: facture.id });
      console.log('Facture supprimée:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression de la facture:', error);
    }
  };

  const handlePaymentValidation = async () => {
    try {
      const response = await axios.post('http://172.31.32.102:3001/paiement_valide', { factureId: facture.id });
      console.log('Paiement validé:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la validation du paiement:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, overflow: 'auto', maxHeight: '80vh' }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        {facture.nom} - Facture {facture.id}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {pdfUrl && (
          <Box sx={{md :2, border: '1px solid #ddd'}}>
            <PDFViewer pdfUrl={pdfUrl} />
          </Box>
          )}   
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: 2 }}>
            <Typography variant="body1"><strong>Date d'échéance:</strong> {facture.dateEcheance}</Typography>
            <Typography variant="body1"><strong>Prix Total TTC:</strong> {facture.prixTotalTTC}</Typography>
            <Typography variant="body1"><strong>Remise:</strong> {facture.remises}</Typography>
            <Typography variant="body1" align="center" sx={{ md :2 }}>
            ({facture.haveBeenPaid ? 'PAYÉ' : 'PAS PAYÉ'})
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              sx={{ mt: 2, width: '100%' }}
            >
              Supprimer la Facture
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaymentValidation}
              sx={{ mt: 2, width: '100%' }}
            >
              Valider le Paiement
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FactureDetail;
