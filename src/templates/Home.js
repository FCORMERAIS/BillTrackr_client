import React from 'react';
import axios from 'axios';
import { Button, Typography, Container, Box } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel'
import "../css/home.css"
import config from '../config.json';

const Home = () => {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const token = getTokenFromLocalStorage();
  let firstName = '';

  if (token) {
    const decoded = jwtDecode(token);
    firstName = decoded.firstName;
  }

  const handlePostRequest = async () => {
    const decoded = jwtDecode(token);
    try {
      const response = await axios.post(`http://${config.ipv4}:3001/refresh`, {
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
      const response = await axios.post(`http://${config.ipv4}:3001/deactivate_token`, {
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
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3" className='textHome' gutterBottom sx={{fontFamily: 'Archivo Black, sans-serif'}}>
          {isLoggedIn ? `Bonjour ${firstName}` : 'Bienvenue sur BillTrackr'}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{fontFamily: 'Archivo Black, sans-serif'}}>
          {isLoggedIn
            ? 'Cette application vous aide à gérer vos factures efficacement.'
            : 'Veuillez vous connecter pour pouvoir accéder au site.'}
        </Typography>

      </Box>
      <div className='caroussel'>
        <h2>
          Fonctionnalités future :
        </h2>
          <Carousel/>
      </div>

    </Container>
  );
};

export default Home;
