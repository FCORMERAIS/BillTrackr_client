import React, { useState, useEffect } from 'react';
import {Container, TextField, Button, Typography, Box, FormControl, InputLabel, MenuItem, Select, Alert} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Corriger l'import de jwtDecode
import "../css/Facture.css";
import '@fontsource/archivo-black';
import config from '../config.json';

function Facture() {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [nameFile, setNameFile] = useState('');
  const [error, setError] = useState(''); // État pour stocker le message d'erreur
  const [formData, setFormData] = useState({
    clientName: '',
    dateEcheance: '',
    prixtotalTTC: '',
    remise: '',
    nom: '',
  });
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
      handleChange({ target: { name: 'nom', value: file.name } });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur avant chaque soumission

    if (!selectedFile) {
      setError('Aucun fichier sélectionné.');
      return;
    }

    if (!formData.clientName || !formData.dateEcheance || !formData.prixtotalTTC || !formData.remise || !formData.nom) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        const formDataFile = new FormData();
        formDataFile.append('file', selectedFile);

        try {
          const response = await axios.post(`http://${config.ipv4}:3001/upload`, formDataFile, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setNameFile(response.data.file.filename);
          const decoded = jwtDecode(token);

          await axios.post(`http://${config.ipv4}:3001/add_facture`, {
            clientName: formData.clientName,
            dateEcheance: formData.dateEcheance,
            prixtotalTTC: formData.prixtotalTTC,
            remise: formData.remise,
            nom: formData.nom,
            userId: decoded.id,
            path: response.data.file.filename,
          });
          navigate('/acceuil');
        } catch (error) {
          setError('Erreur lors du téléchargement du fichier.');
        }
      } else {
        setError('Utilisateur non connecté.');
      }
    } catch (error) {
      if (error.response) {
        setError('Erreur lors de la création de la facture.');
      } else if (error.request) {
        setError('Aucune réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  const fetchClients = async (userId) => {
    try {
      const response = await axios.post(
        `http://${config.ipv4}:3001/get_clients_from_user`,
        {
          userId: userId,
        }
      );
      setClients(response.data);
    } catch (error) {
      setError('Impossible de récupérer les clients.');
    }
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const decoded = jwtDecode(token);
      fetchClients(decoded.id);
    }
  }, []);

  const ClientSelect = ({ clients, handleChange }) => {
    const handleSelectChange = (event) => {
      setClient(event.target.value);
      handleChange(event);
    };

    return (
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel
          id="client-select-label"
          sx={{ fontFamily: 'Archivo Black, sans-serif' }}
        >
          Client
        </InputLabel>
        <Select
          labelId="client-select-label"
          id="clientName"
          value={client}
          onChange={handleSelectChange}
          label="clientName"
          name="clientName"
          sx={{ fontFamily: 'Archivo Black, sans-serif' }}
        >
          {clients.map((client) => (
            <MenuItem
              key={client.nom}
              value={client.nom}
              sx={{ fontFamily: 'Archivo Black, sans-serif' }}
            >
              {client.nom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}  className="boxFacture">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mt: 3, mb: 2, fontFamily: 'Archivo Black, sans-serif' }}
        >
          Facture
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <ClientSelect clients={clients} handleChange={handleChange} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dateEcheance"
            label="Date d'échéance"
            name="dateEcheance"
            type="date"
            InputLabelProps={{ shrink: true, style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            autoComplete="dateEcheance"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="prixtotalTTC"
            label="Prix total TTC"
            name="prixtotalTTC"
            type="number"
            autoComplete="prixtotalTTC"
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="remise"
            label="Remise"
            type="number"
            id="remise"
            autoComplete="remise"
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nom"
            label="Nom"
            type="text"
            id="nom"
            autoComplete="nom"
            InputLabelProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            inputProps={{ style: { fontFamily: 'Archivo Black, sans-serif' } }}
            onChange={handleChange}
          />
          <Box display="flex" alignItems="center" mt={2}>
            <input
              accept=".pdf,.doc,.docx,.xlsx,.csv"
              id="upload-file"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload-file">
              <Button
                variant="contained"
                component="span"
                sx={{ mt: 3, mb: 2, fontFamily: 'Archivo Black, sans-serif' }}
              >
                Choisir un fichier
              </Button>
            </label>
          </Box>
          {fileUrl && (
            <Box mt={2} width="100%" textAlign="center">
              <Typography variant="body1" sx={{ fontFamily: 'Archivo Black, sans-serif', color: '#000' }}>
                Aperçu du fichier :
              </Typography>
              {selectedFile.type.startsWith('image/') ? (
                <img
                  src={fileUrl}
                  alt="Aperçu du fichier"
                  style={{ maxWidth: '100%' }}
                />
              ) : (
                <a
                  className='color'
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#e4b211', textDecoration: 'none' }}
                >
                  {selectedFile.name}
                </a>
              )}
            </Box>
          )}
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
            Ajouter une Facture
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Facture;
