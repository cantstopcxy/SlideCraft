import React from 'react';
import { MenuItem } from '@mui/material';
import api from '../api';

function Logout ({ token, setToken }) {
  const logout = async () => {
    try {
      await api.post('/admin/auth/logout', {}, {
        headers: {
          Authorization: token,
        }
      });
      setToken(null);
      localStorage.removeItem('token');
    } catch (err) {
      console.error(err);
      alert(err.response.data.error);
    }
  };

  return (
    <MenuItem onClick={logout}>Logout</MenuItem>
  );
}

export default Logout;
