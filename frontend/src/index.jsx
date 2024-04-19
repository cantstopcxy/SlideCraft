import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556CD6',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#F0F0f0',
    },
    iconLight: '#FFFFFF',
    iconDark: '#6E6E6E',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
