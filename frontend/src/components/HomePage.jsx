import React from 'react';
import { Box, Toolbar } from '@mui/material';

// 'main' page display on dashboard -> render presentation cards here
function HomePage ({ drawerWidth }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: 3,
        px: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* presentation cards go in here */}
      </Box>
    </Box>
  );
}

export default HomePage;
