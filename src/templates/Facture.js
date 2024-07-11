import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Facture() {
  const [formData, setFormData] = useState({
    user_email: '',
    client_id: '',
    date_echeance: '',
    prixtotalTTC: '',
    remise: '',
    nom : "",
  });
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/add_facture', {
        user_email: formData.email,
        client_id: formData.client_id,
        date_echeance: formData.date_echeance,
        prixtotalTTC: formData.prixtotalTTC,
        remise: formData.remise,
        nom : formData.nom,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      
      navigate('/'); 
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        // Gérez les erreurs spécifiques à la réponse
      } else if (error.request) {
        console.error('No response received:', error.request);
        // Gérez les erreurs où aucune réponse n'a été reçue
      } else {
        console.error('Error', error.message);
        // Gérez d'autres erreurs (erreurs de configuration, etc.)
      }
    }
  };

  const clients = [
    { id: '1', name: 'Client 1' },
    { id: '2', name: 'Client 2' },
    { id: '3', name: 'Client 3' },
    { id: '4', name: 'Client 4' },
    { id: '5', name: 'Client 5' },
  ];

  const ClientSelect = ({ clients, handleChange }) => {
    const [client, setClient] = React.useState('');
  
    const handleSelectChange = (event) => {
      setClient(event.target.value);
      handleChange(event);
    };
  
    return (
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="client-select-label">Client</InputLabel>
        <Select
          labelId="client-select-label"
          id="client-select"
          value={client}
          onChange={handleSelectChange}
          label="Client"
          name="client_id"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Facture
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <ClientSelect clients={clients} handleChange={handleChange} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user_email"
            label="user_email"
            name="user_email"
            autoComplete="user_email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="date_echeance"
            label="date_echeance"
            name="date_echeance"
            autoComplete="date_echeance"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="prixtotalTTC"
            label="prixtotalTTC"
            name="prixtotalTTC"
            autoComplete="prixtotalTTC"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="remise"
            label="remise"
            type="remise"
            id="remise"
            autoComplete="current-password"
            onChange={handleChange}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nom"
            label="nom"
            type="nom"
            id="nom"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter une Facture
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Facture;