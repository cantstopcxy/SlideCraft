import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import EditSideBar from '../components/EditSideBar';
import SlideContainer from '../components/SlideContainer';

// page for editing presentations -> path for edit page needs unique presentation id
function EditPresentation () {
  const { presentationId } = useParams();
  const navigate = useNavigate();

  console.log(presentationId);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <EditSideBar />

      {/* main editing view */}
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Home button */}
        <IconButton
          aria-label='home'
          onClick={() => navigate('/dashboard')}
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <HomeIcon />
        </IconButton>

        {/* Add slide button */}
        <IconButton
          aria-label='new slide'
          sx={{
            bgcolor: '#ACACAD',
            color: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            right: 16,
            transform: 'translateY(-50%)',
          }}
        >
          <AddOutlinedIcon />
        </IconButton>

        {/* slide editing container */}
        <SlideContainer />
      </Box>
    </Box>
  );
}

export default EditPresentation;
