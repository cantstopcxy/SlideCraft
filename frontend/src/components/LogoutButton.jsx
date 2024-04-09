import React from 'react';
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
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
}

export default Logout;
