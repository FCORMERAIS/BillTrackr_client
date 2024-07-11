import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function Profile() {
    const [prenom, setFirstName] = useState('');
    const [nom, setLastName] = useState('');
    const [adresse, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [tokenJWT, setTokenJWT] = useState('');
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      // Récupérer le jeton JWT du localStorage
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


    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/change_profile', {
            prenom: prenom,
            nom: nom,
            adresse: adresse,
            email : email,
            token: tokenJWT,
          });
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.accessToken);
          navigate('/'); 
        } catch (error) {
          if (error.response.data.message === "accessToken invalide") {
            alert("accessTokenInvalide")
          }
          else if (error.response) {
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


    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
  
  return (
    <div className="profile">
      {user ? (
        <>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className="name-fields">

                <p>pernom : </p><input
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={handleFirstNameChange}
                />
                <p>nom : </p><input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={handleLastNameChange}
                />
            </div>
            <p>adresse : </p>
            <input
                type="text"
                placeholder="Adresse"
                value={adresse}
                onChange={handleAddressChange}
                className="address-field"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                ENREGISTRER PROFILE
            </Button>
            </form>
        </>
      ) : (
        <p>Veuillez vous connecter.</p>
      )}
    </div>
  );
}

export default Profile;
