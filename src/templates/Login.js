import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/login.css"
import config from '../config.json';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // État pour stocker le message d'erreur
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`http://${config.ipv4}:3001/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/acceuil');
    } catch (error) {
      if (error.response) {
        setError('L\'email ou le mot de passe n\'est pas bon');
      } else if (error.request) {
        setError('Aucune réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5} className="boxLogin">
        <Typography  variant="h4" component="h1" gutterBottom>
          <img className='logo' src="./image.png" alt="Logo" />
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse email"
            name="email"
            autoComplete="email"
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            value={formData.password}
            onChange={handleChange}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, fontFamily: 'Archivo Black, sans-serif' }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, fontFamily: 'Archivo Black, sans-serif' }}
          >
            Se connecter
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 3, mb: 2, fontFamily: 'Archivo Black, sans-serif' }}>
          Se créer un compte ? <a href="/creer">Clique ici</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
