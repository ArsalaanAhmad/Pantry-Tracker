import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme with your desired font
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'rgba(232, 232, 232,0.9)', width: '100%' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <ShoppingCartIcon sx={{ color: 'black' }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', fontFamily: 'Kablammo' }}>
              MyPantryMan
            </Typography>
            <IconButton color="inherit" href="https://github.com/ArsalaanAhmad/Pantry-Tracker" target="_blank" rel="noopener noreferrer">
              <GitHubIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com/in/arsalaan-ahmad/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon sx={{ color: 'black' }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;