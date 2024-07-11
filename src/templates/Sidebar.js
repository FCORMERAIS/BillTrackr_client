import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ onMenuItemClick }) => (
  <Box sx={{ width: '200px', bgcolor: 'grey.300', height: '100vh', padding: 2 }}>
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

export default Sidebar;