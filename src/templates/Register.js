import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '@fontsource/archivo-black';
import "../css/register.css";
import config from '../config.json';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(''); // État pour stocker le message d'erreur
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fonction pour vérifier si le mot de passe respecte les critères
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur à chaque tentative

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Vérification si le mot de passe respecte les critères
    if (!isPasswordValid(formData.password)) {
      setError('Le mot de passe doit contenir au moins 12 caractères, avec au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.');
      return;
    }

    try {
      const response = await axios.post(`http://${config.ipv4}:3001/users`, {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      console.log(response.data);
      navigate('/connection'); // Redirection vers la page de connexion
    } catch (error) {
      if (error.response) {
        setError('Une erreur est survenue lors de la création du compte.');
      } else if (error.request) {
        setError('Aucune réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5} className="boxRegister">
        <Typography variant="h4" component="h1" gutterBottom>
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
            autoFocus
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={formData.confirmPassword}
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
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
            Créer un compte
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 3, mb: 2, fontFamily: 'Archivo Black, sans-serif' }}>
          Déjà un compte ? <a href="/connection">Clique ici</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
