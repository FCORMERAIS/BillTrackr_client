import React from 'react';
import axios from 'axios';
import { Button, Typography, Container, Box } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const token = getTokenFromLocalStorage();
  let firstName = '';

  if (token) {
    const decoded = jwtDecode(token);
    firstName = decoded.firstName; // Assurez-vous que le prénom est stocké sous cette clé dans votre token
  }

  const handlePostRequest = async () => {
    const decoded = jwtDecode(token);
    try {
      const response = await axios.post('http://localhost:3001/refresh', {
        email: decoded.email,
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

  const navigate = useNavigate();

  const deconnected = async () => {
    try {
      const decoded = jwtDecode(token);
      const response = await axios.post('http://localhost:3001/deactivate_token', {
        userId: decoded.id,
      });
      console.log(response.data);
      localStorage.removeItem('accessToken');
      navigate('/acceuil');
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

  const handleLoginRedirect = () => {
    navigate('/acceuil');
  };

  const isLoggedIn = !!token;

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          {isLoggedIn ? `Bonjour ${firstName}` : 'Bienvenue sur BillTrackr'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {isLoggedIn
            ? 'Cette application vous aide à gérer vos factures efficacement.'
            : 'Veuillez vous connecter pour pouvoir accéder au site.'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
