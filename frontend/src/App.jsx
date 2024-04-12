import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EditPresentation from './pages/EditPresentation';

function App () {
  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lsToken);

  const persistToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login token={token} onTokenChange={persistToken} />} />
        <Route path="/register" element={<Register token={token} onTokenChange={persistToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} onTokenChange={persistToken} />} />
        <Route path="/edit/:presentationId" element={<EditPresentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
