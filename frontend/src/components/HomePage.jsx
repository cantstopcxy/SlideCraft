import React from 'react';
import { Box, Toolbar } from '@mui/material';

import SlideCards from './SlideCards';

function HomePage ({ drawerWidth, presentations }) {
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
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        <SlideCards presentations={presentations} />
      </Box>
    </Box>
  );
}

export default HomePage;
