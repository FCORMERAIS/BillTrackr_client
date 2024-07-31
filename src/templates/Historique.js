import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const FactureHistory = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFactures = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        try {
          const response = await axios.post('http://localhost:3001/get_facture_history', { userId });
          setFactures(response.data);
          console.log('Fetched clients:', response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
          setError(error.message || 'An error occurred'); // Extract a meaningful message
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFactures();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>; // Display the error message
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Historique des Factures
        </Typography>
        <List>
          {factures.map((facture) => (
            <ListItem key={facture.id} sx={{ borderBottom: '1px solid #ccc' }}>
              <ListItemText
                primary={`Facture #${facture.id} - ${facture.nom}`}
                secondary={`Date d'échéance: ${facture.dateEcheance} - Prix Total TTC: ${facture.prixTotalTTC} - Remise: ${facture.remises} - Payé: ${facture.haveBeenPaid ? 'Oui' : 'Non'}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FactureHistory;
