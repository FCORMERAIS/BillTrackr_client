import React, { useState, useEffect } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { Button, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../css/MenuBar.css"
import config from '../config.json';

const NavbarComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };
  const token = getTokenFromLocalStorage();

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
    navigate('/connection');
  };

  const isLoggedIn = !!token;
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = () => {
    if (isAuthenticated) {
      sessionStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    } 
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Navbar.Brand href="/acceuil" className="navbar-logo" id="navbar-logo">
        BillTrackr
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        {isLoggedIn ? (
          <>
            <Nav className="mx-auto">
              <Nav.Link href="/Profil" className='link-color'>Profil</Nav.Link>
              <Nav.Link href="/ajouter" className='link-color'>Ajouter</Nav.Link>
              <Nav.Link href="/listeFactures" className='link-color'>Liste des Factures</Nav.Link>
              <Nav.Link href="/historique" className='link-color'>Historique</Nav.Link>
            </Nav>
            <Box className = "boutton">

            <Button
              className="bouton_co"
              variant="contained"
              id="bouton_co"
              onClick={deconnected}
              sx={{ mt: 3, mb: 2, fontFamily: 'Archivo Black, sans-serif' }}
            >
              SE DECONNECTER
            </Button>
            </Box>
          </>
        ) : (
          <Nav className="mx-auto">
            <Box className = "boutton">
            <Button
              className="bouton_co"
              id="bouton_co"
              variant="contained"
              onClick={handleLoginRedirect}
              sx={{ mt: 2, whiteSpace: 'nowrap' }}
              >
              SE CONNECTER
            </Button>
            </Box>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
