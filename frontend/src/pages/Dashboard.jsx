import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Box } from '@mui/material';

import NavBar from '../components/NavBar';
import SideBar, { drawerWidth } from '../components/SideBar';
import HomePage from '../components/HomePage';

function Dashboard ({ token, onTokenChange }) {
  const [presentations, setPresentations] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token === null) {
      navigate('/login');
    } else {
      api.get('/store', {
        headers: {
          Authorization: token,
        }
      }).then((response) => {
        setPresentations(response.data.store);
      });
    }
  }, [token, navigate]);

  const addNewPresentation = (newPresentation) => {
    setPresentations(newPresentation);
  };

  React.useEffect(() => {
    console.log(presentations);
  }, [presentations]);

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar token={token} setToken={onTokenChange} addNewPresentation={addNewPresentation} />
      <SideBar activePage='home' />
      <HomePage drawerWidth={drawerWidth} presentations={presentations} />
    </Box>
  );
}

export default Dashboard;
