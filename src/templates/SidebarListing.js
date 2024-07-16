import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Collapse } from '@mui/material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const SidebarCreate = ({ onInvoiceClick }) => {
  const [clients, setClients] = useState([]);
  const [factures, setFactures] = useState({});
  const [openClients, setOpenClients] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        try {
          const response = await axios.post('http://localhost:3001/get_clients_from_user', { userId });
          setClients(response.data);
          console.log('Fetched clients:', response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      }
    };

    fetchClients();
  }, []);

  const handleClientClick = async (clientId) => {
    setOpenClients((prevOpenClients) => ({
      ...prevOpenClients,
      [clientId]: !prevOpenClients[clientId],
    }));

    if (!factures[clientId]) {
      try {
        const token = localStorage.getItem('accessToken');
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const response = await axios.post('http://localhost:3001/get_facture_by_client', { ClientId : clientId, UserId : userId});
        setFactures((prevFactures) => ({
          ...prevFactures,
          [clientId]: response.data,
        }));
        console.log(`Fetched factures for client ${clientId}:`, response.data);
      } catch (error) {
        console.error('Error fetching factures:', error);
      }
    }
  };

  return (
    <Box sx={{ width: '200px', bgcolor: 'grey.300', height: '100vh', padding: 2 }}>
      <List component="nav">
        {clients.map((client) => (
          <React.Fragment key={client.id}>
            <ListItem button onClick={() => handleClientClick(client.id)}>
              <ListItemText primary={client.nom} />
              {openClients[client.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openClients[client.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {factures[client.id]?.map((facture) => (
                  <ListItem 
                    key={facture.id} 
                    button 
                    sx={{ pl: 4 }} 
                    onClick={() => onInvoiceClick(facture)}
                  >
                    <ListItemText primary={facture.nom} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SidebarCreate;
