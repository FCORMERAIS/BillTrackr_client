import React, { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Facture() {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken')
  }

  const [selectedFile, setSelectedFile] = useState(null)
  const [fileUrl, setFileUrl] = useState('')
  const [nameFile, setnameFile] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileUrl(URL.createObjectURL(file))
      handleChange({ target: { name: 'nom', value: file.name } })
    }
  }

  const [formData, setFormData] = useState({
    clientName: '',
    dateEcheance: '',
    prixtotalTTC: '',
    remise: '',
    nom: '',
  })

  const [clients, setClients] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = getTokenFromLocalStorage()
      if (token) {
        if (!selectedFile) {
          alert('Aucun fichier sélectionné')
          return
        }

        const formDataFile = new FormData()
        formDataFile.append('file', selectedFile)

        try {
          const response = await axios.post(
            'http://localhost:3001/upload',
            formDataFile,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          setnameFile(response.data.file.filename)
          const decoded = jwtDecode(token)
          console.log(formData)
          const response2 = await axios.post('http://localhost:3001/add_facture', {
            clientName: formData.clientName,
            dateEcheance: formData.dateEcheance,
            prixtotalTTC: formData.prixtotalTTC,
            remise: formData.remise,
            nom: formData.nom,
            userId: decoded.id,
            path: response.data.file.filename,
          })
          navigate('/acceuil')

        } catch (error) {
          console.error('Erreur lors du téléchargement du fichier', error)
          alert('Erreur lors du téléchargement du fichier')
        }
      } else {
        console.log('ERREUR PAS CONECTÉ')
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data)
      } else if (error.request) {
        console.error('No response received:', error.request)
      } else {
        console.error('Error', error.message)
      }
    }
  }

  const fetchClients = async (userId) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/get_clients_from_user',
        {
          userId: userId,
        },
      )
      setClients(response.data)
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    }
  }

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      const decoded = jwtDecode(token)
      fetchClients(decoded.id)
    }
  }, [])
  const [client, setClient] = useState('')

  const ClientSelect = ({ clients, handleChange }) => {
    const handleSelectChange = (event) => {
      setClient(event.target.value)
      handleChange(event)
    }

    return (
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="client-select-label">Client</InputLabel>
        <Select
          labelId="client-select-label"
          id="clientName"
          value={client}
          onChange={handleSelectChange}
          label="clientName"
          name="clientName"
        >
          {clients.map((client) => (
            <MenuItem key={client.nom} value={client.nom}>
              {client.nom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
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
            InputLabelProps={{ shrink: true }}
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
            autoFocus
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
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nom"
            label="nom"
            type="nom"
            id="nom"
            autoComplete="current-password"
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
              <Button variant="contained" component="span">
                Choisir un fichier
              </Button>
            </label>
          </Box>
          {fileUrl && (
            <Box mt={2} width="100%" textAlign="center">
              <Typography variant="body1">Aperçu du fichier :</Typography>
              {selectedFile.type.startsWith('image/') ? (
                <img
                  src={fileUrl}
                  alt="Aperçu du fichier"
                  style={{ maxWidth: '100%' }}
                />
              ) : (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  {selectedFile.name}
                </a>
              )}
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter une Facture
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Facture
