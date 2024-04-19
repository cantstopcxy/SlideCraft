import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EditPresentation from './pages/EditPresentation';
import PreviewPage from './pages/Preview';
import { SlideProvider } from './SlideContext';

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

  const EditPresentationWithProvider = () => {
    const { presentationId, slideId } = useParams();
    return (
      <SlideProvider presentationId={presentationId} slideId={slideId} token={token}>
        <EditPresentation token={token} />
      </SlideProvider>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login token={token} onTokenChange={persistToken} />} />
        <Route path="/register" element={<Register token={token} onTokenChange={persistToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} onTokenChange={persistToken} />} />
        <Route path="/edit/:presentationId/:slideId" element={<EditPresentationWithProvider />} />
        <Route path="/preview/:presentationId/:slideId" element={<PreviewPage token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
