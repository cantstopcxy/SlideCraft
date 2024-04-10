import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Box, Typography } from '@mui/material';

import NavBar from '../components/NavBar';

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
    <Box sx={{ width: '100%' }}>
      <NavBar token={token} setToken={onTokenChange} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100vh - 64px)',
          mt: '64px'
        }}
      >
        {/* sidebar */}
        <Box
          sx={{
            minWidth: 400,
            bgcolor: '#f0f0f0',
            p: 2
          }}
        >
          <Typography variant="h4">Profile</Typography>
        </Box>

        {/* for the cards */}
        <Box
          sx={{
            width: '100%',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography
            variant='h5'
            sx={{
              color: '#999',
              mt: '-50px',
              userSelect: 'none'
            }}
          >
            Create a new deck
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
