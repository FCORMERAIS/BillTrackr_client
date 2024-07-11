import React from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const token = getTokenFromLocalStorage()

  const handlePostRequest = async () => {
    try {
      const decoded = jwtDecode(token);
      const response = await axios.post('http://localhost:3001/refresh', {
        email : decoded.email,
      });
      console.log(response.data);
      alert('Le token est valide');
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        alert('Le token est invalide');
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('Erreur de connexion');
      } else {
        console.error('Error', error.message);
        alert('Erreur inconnue');
      }
    }
  };

  return (
    <div>
      <Typography variant="h1">Bienvenue sur BillTrackr</Typography>
      <Typography variant="body1">Cette application vous aide à gérer vos factures efficacement.</Typography>
      <Button variant="contained" color="primary" onClick={handlePostRequest} sx={{ mt: 2 }}>
        Vérifier le token
      </Button>
    </div>
  );
};

export default Home;
