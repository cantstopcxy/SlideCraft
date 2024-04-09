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

  return (
    <div className="dashboard">
      {/* TODO: move nav bar into components */}
      <nav>
        <ul>
          {/* can add other nav components */}
          <li>
            <LogoutButton token={token} setToken={onTokenChange} /><br />
          </li>
        </ul>
      </nav>

      <div className="main-split-panel">
        <div className="sidebar-wrapper">
          <div className="user-info">
            <h2>Profile</h2>
          </div>
        </div>
        <div className="content-wrapper">
          <h3 id="default-dash" style={{ color: '#999999', fontSize: '23px', marginTop: '-50px', userSelect: 'none' }}>Create a new deck</h3>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
