import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

function SlideContainer () {
  // get data for current slide

  return (
  <Container sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
    <Paper
      elevation={0}
      sx={{
        mx: 'auto',
        aspectRatio: '3 / 2',
        width: '90%',
        maxHeight: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* placeholder for slide content */}
      <Typography variant='h5' align='center' sx={{ flexGrow: 1 }}>
        Your Slide Content Here
      </Typography>
    </Paper>
  </Container>
  )
}

export default SlideContainer;
