import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "../css/Client.css"
import '@fontsource/archivo-black';


function Client() {
  const [formData, setFormData] = useState({
    nomClient : "",
  });
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const token = getTokenFromLocalStorage()

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
      const decoded = jwtDecode(token);
      const response = await axios.post(`http://${config.ipv4}:3001/add_client`, {
        nomClient: formData.nomClient,
        userId : decoded.id
      });      
      console.log(response.data)
      navigate('/acceuil'); 
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


  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5} className ="boxClient">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Archivo Black, sans-serif' }}>
          Client
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off" >
          <TextField
            sx={{ fontFamily: 'Archivo Black, sans-serif' }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nomClient"
            label="nomClient"
            name="nomClient"
            autoComplete="nomClient"
            autoFocus
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 ,fontFamily: 'Archivo Black, sans-serif'}}
          >
            Ajouter un Client
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Client;