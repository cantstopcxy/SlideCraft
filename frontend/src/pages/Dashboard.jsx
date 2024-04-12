import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Box } from '@mui/material';

import NavBar from '../components/NavBar';
import SideBar, { drawerWidth } from '../components/SideBar';
import HomePage from '../components/HomePage';

function Dashboard ({ token, onTokenChange }) {
  const [store, setStore] = React.useState({});
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
        setStore(response.data.store)
      });
    }
  }, [token, navigate]);

  console.log(store);

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar token={token} setToken={onTokenChange} />
      <SideBar activePage='home' />
      <HomePage drawerWidth={drawerWidth} />
    </Box>
  );
}

export default Dashboard;
