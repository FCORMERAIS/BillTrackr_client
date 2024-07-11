import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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
      const response = await axios.post('http://localhost:3001/login', {
        email: formData.email,
        password: formData.password,
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

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          BillTrackr (logo)
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
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
        </form>
        <Typography variant="body2">
          Se créer un compte ? <a href="/register">Clique ici</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;