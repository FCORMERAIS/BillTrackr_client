import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const SidebarCreate = ({ onMenuItemClick }) => (
  <Box sx={{ width: '10%', bgcolor: 'grey.300', height: '100vh', padding: 2 }}>
    <List component="nav">
      <ListItem button onClick={() => onMenuItemClick('invoice')}>
        <ListItemText primary="Facture" />
      </ListItem>
      <ListItem button onClick={() => onMenuItemClick('client')}>
        <ListItemText primary="Client" />
      </ListItem>
    </List>
  </Box>
);

export default SidebarCreate;