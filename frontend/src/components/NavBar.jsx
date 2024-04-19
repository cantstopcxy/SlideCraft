import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

import CreateButton from './CreatePresentationButton';
import LogoutButton from './LogoutButton';

function NavBar ({ token, setToken, addNewPresentation }) {
  return (
    <AppBar position='fixed' sx={{ bgcolor: 'secondary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <CreateButton token={token} addNewPresentation={addNewPresentation} />
        <LogoutButton token={token} setToken={setToken} />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
