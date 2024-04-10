import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

import LogoutButton from './LogoutButton';

function NavBar ({ token, setToken }) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333333', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <LogoutButton token={token} setToken={setToken} />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
