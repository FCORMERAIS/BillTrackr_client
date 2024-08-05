import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import PDFViewer from './PDFViewer';

const FactureDetail = ({ facture, onDelete }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        if (facture) {
          const response = await axios.post('http://localhost:3001/get_pdf', { factureId: facture.id });
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
      const response = await axios.post('http://localhost:3001/delete_facture', { factureId: facture.id });
      console.log('Facture supprimée:', response.data);
      onDelete(facture.id); // Appelez la fonction de rappel pour mettre à jour l'état
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression de la facture:', error);
    }
  };

  const handlePaymentValidation = async () => {
    try {
      const response = await axios.post('http://localhost:3001/paiement_valide', { factureId: facture.id });
      console.log('Paiement validé:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la validation du paiement:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Détails de la Facture</Typography>
      <Typography variant="body1"><strong>Nom:</strong> {facture.nom}</Typography>
      <Typography variant="body1"><strong>Date d'échéance:</strong> {facture.dateEcheance}</Typography>
      <Typography variant="body1"><strong>Prix Total TTC:</strong> {facture.prixTotalTTC}</Typography>
      <Typography variant="body1"><strong>Remise:</strong> {facture.remises}</Typography>
      <Typography variant="body1"><strong>Payé ? :</strong> {facture.haveBeenPaid ? 'Oui' : 'Non'}</Typography>
      {pdfUrl && (
        <Box mt={2}>
          <Typography variant="body1"><strong>Aperçu du document :</strong></Typography>
          <PDFViewer pdfUrl={pdfUrl} />
        </Box>
      )}
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleDelete} 
        sx={{ mt: 2 }}
      >
        Supprimer la Facture
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePaymentValidation} 
        sx={{ mt: 2, ml: 2 }}
      >
        Valider le Paiement
      </Button>
    </Box>
  );
};

export default FactureDetail;
