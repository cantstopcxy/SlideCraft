import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

function SlideContainer ({ currentSlideId }) {
  // get data for current slide
  /* You can implement displaying the presentation content based on presentationId */
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
        position: 'relative',
      }}
    >
      {/* placeholder for slide content */}
      <Typography variant='h5' align='center' sx={{ flexGrow: 1 }}>
        Your Slide Content Here
      </Typography>
      {/* show slide numbers at bottom left */}
      <Typography
        variant='body1'
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          width: '50px',
          height: '50px',
          fontSize: '1em',
          color: 'black',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {currentSlideId}
      </Typography>
    </Paper>
  </Container>
  )
}

export default SlideContainer;
