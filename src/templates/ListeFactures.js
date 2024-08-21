import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Dialog, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import PDFViewer from './PDFViewer';
import { jwtDecode } from 'jwt-decode';

const FactureDetail = () => {
  const [clients, setClients] = useState([]);
  const [factures, setFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openFactureDialog, setOpenFactureDialog] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        try {
          const response = await axios.post('http://localhost:3001/get_clients_from_user', { userId });
          setClients(response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchPdf = async () => {
      if (!selectedFacture) return;

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:3001/get_pdf', { factureId: selectedFacture.id });
        setPdfUrl(response.data.pdfUrl);
      } catch (error) {
        console.error('Erreur lors de la récupération du PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [selectedFacture]);

  const handleClientClick = async (clientId) => {
    setSelectedClient(clientId);
    setOpenClientDialog(false);

    try {
      const token = localStorage.getItem('accessToken');
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const response = await axios.post('http://localhost:3001/get_facture_by_client', { ClientId: clientId, UserId: userId });
      setFactures(response.data);
      setOpenFactureDialog(true);
    } catch (error) {
      console.error('Error fetching factures:', error);
    }
  };

  const handleSelectFacture = (facture) => {
    setSelectedFacture(facture);
    setOpenFactureDialog(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post('http://localhost:3001/delete_facture', { factureId: selectedFacture.id });
      console.log('Facture supprimée:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression de la facture:', error);
    }
  };

  const handlePaymentValidation = async () => {
    try {
      const response = await axios.post('http://localhost:3001/paiement_valide', { factureId: selectedFacture.id });
      console.log('Paiement validé:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la validation du paiement:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {!selectedFacture ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80h' }}>
          <Button variant="contained" color="primary" onClick={() => setOpenClientDialog(true)}>
            Choisir une facture
          </Button>

          <Dialog open={openClientDialog} onClose={() => setOpenClientDialog(false)}>
            <List>
              {clients.length === 0 ? (
                <ListItem>
                  <CircularProgress size={24} />
                </ListItem>
              ) : (
                clients.map((client) => (
                  <ListItem button key={client.id} onClick={() => handleClientClick(client.id)}>
                    <ListItemText primary={client.nom} />
                  </ListItem>
                ))
              )}
            </List>
          </Dialog>

          <Dialog open={openFactureDialog} onClose={() => setOpenFactureDialog(false)}>
            <List>
              {factures.length === 0 ? (
                <ListItem>
                  <CircularProgress size={24} />
                </ListItem>
              ) : (
                factures.map((facture) => (
                  <ListItem button key={facture.id} onClick={() => handleSelectFacture(facture)}>
                    <ListItemText primary={`Facture ${facture.id} - ${facture.nom}`} />
                  </ListItem>
                ))
              )}
            </List>
          </Dialog>
          </Box>

        </>
      ) : (
        <Box sx={{ overflow: 'auto', maxHeight: '100vh' }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            {selectedFacture.nom} - Facture {selectedFacture.id}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {loading ? (
                <Typography variant="h6">Chargement des détails de la facture...</Typography>
              ) : (
                pdfUrl && (
                  <Box sx={{ border: '1px solid #ddd' }}>
                    <PDFViewer pdfUrl={pdfUrl} />
                  </Box>
                )
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: '1px solid #ddd', padding: 2 }}>
                <Typography variant="body1"><strong>Date d'échéance:</strong> {selectedFacture.dateEcheance}</Typography>
                <Typography variant="body1"><strong>Prix Total TTC:</strong> {selectedFacture.prixTotalTTC}</Typography>
                <Typography variant="body1"><strong>Remise:</strong> {selectedFacture.remises}</Typography>
                <Typography variant="body1" align="center">
                  ({selectedFacture.haveBeenPaid ? 'PAYÉ' : 'PAS PAYÉ'})
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
      )}
    </Box>
  );
};

export default FactureDetail;
