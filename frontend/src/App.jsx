import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App () {
  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lsToken);

  const persistToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login token={token} onTokenChange={persistToken} />} />
          <Route path="/register" element={<Register token={token} onTokenChange={persistToken} />} />
          <Route path="/dashboard" element={<Dashboard token={token} onTokenChange={persistToken} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
