import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrigé l'import de jwtDecode
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [prenom, setFirstName] = useState('');
    const [nom, setLastName] = useState('');
    const [adresse, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [tokenJWT, setTokenJWT] = useState('');
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const getTokenFromLocalStorage = () => {
        return localStorage.getItem('accessToken');
      };
  
      const token = getTokenFromLocalStorage();

      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
          setTokenJWT(token || '');
          setEmail(decoded.email || '');
          setFirstName(decoded.firstName || '');
          setLastName(decoded.lastName || '');
          setAddress(decoded.adresse || '');
        } catch (err) {
          console.error('Invalid token', err);
        }
      }
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/change_profile', {
            prenom,
            nom,
            adresse,
            email,
            token: tokenJWT,
          });
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.accessToken);
          navigate('/acceuil'); 
        } catch (error) {
          if (error.response.data.message === "accessToken invalide") {
            alert("accessTokenInvalide");
          } else if (error.response) {
            console.error(error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error', error.message);
          }
        }
      };

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Profil
        </Typography>
        {user ? (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Prénom"
              name="firstName"
              value={prenom}
              onChange={handleFirstNameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Nom"
              name="lastName"
              value={nom}
              onChange={handleLastNameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="adresse"
              label="Adresse"
              name="adresse"
              value={adresse}
              onChange={handleAddressChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              ENREGISTRER PROFIL
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">Veuillez vous connecter.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Profile;
