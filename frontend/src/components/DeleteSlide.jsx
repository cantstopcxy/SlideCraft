import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, IconButton, DialogContent, Button, DialogActions, DialogContentText } from '@mui/material';
// import { Box, IconButton, Typography } from '@mui/material';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import api from '../api';
import DeleteIcon from '@mui/icons-material/Delete';

import getData from '../getStore';

function DeleteSlide ({ presentationId, currentSlideId, token, numOfSlides, setNumOfSlides }) {
//   const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const deletePresentation = async () => {
    try {
      // get store data
      const response = await getData(token);
      const storeData = response.data.store;
      delete storeData[presentationId].slides[currentSlideId];

      // reassign the keys of the remaining slides
      let newId = 1;
      const newSlides = {};
      for (const slideId in storeData[presentationId].slides) {
        newSlides[newId.toString()] = storeData[presentationId].slides[slideId];
        newId++;
      }

      storeData[presentationId].slides = newSlides;

      const update = await api.put(
        '/store',
        { store: storeData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      console.log(update);

      // update the number of slides
      setNumOfSlides(prev => prev - 1);
    } catch (error) {
      console.error('Failed to delete presentation:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      // delete presentation
      await deletePresentation(token, presentationId, currentSlideId);
      console.log('Slide deleted:', currentSlideId);
      handleClose();

      let newSlideId;
      if (currentSlideId < numOfSlides) {
        newSlideId = currentSlideId;
      } else if (currentSlideId > 1) {
        newSlideId = currentSlideId - 1;
      } else {
        newSlideId = 1;
      }

      navigate(`/edit/${presentationId}/${newSlideId}`);
    } catch (error) {
      console.error('Failed to delete presentation:', error);
    }
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {numOfSlides > 1 && (
      <IconButton
        aria-label='new slide'
        sx={{
          bgcolor: '#ACACAD',
          color: 'white',
          borderRadius: '50%',
          position: 'absolute',
          bottom: 16,
          left: 16,
          transform: 'translateY(-50%)',
        }}
      onClick={() => handleDelete()}
    >
      <DeleteIcon/>
    </IconButton>
    )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete this slide permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={confirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteSlide;
