import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import api from '../api';

import LogoutButton from '../components/LogoutButton';

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

  return <>
    <LogoutButton token={token} setToken={onTokenChange} /><br />
  </>;
}

export default Dashboard;
