import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, IconButton, DialogContent, Button, DialogActions, DialogContentText } from '@mui/material';
// import { Box, IconButton, Typography } from '@mui/material';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import api from '../api';
import DeleteIcon from '@mui/icons-material/Delete';

import getData from '../getStore';

function DeleteSlide ({ presentationId, currentSlideId, iconSize, token, numOfSlides, setNumOfSlides }) {
//   const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const deletePresentation = async () => {
    try {
      // get store data
      const response = await getData(token);
      // get presentation id array and its content then make them an object
      const slidesArray = Object.keys(response.data.store[presentationId].slides).map(key => ({
        id: parseInt(key), // make sure ID is int
        ...response.data.store[presentationId].slides[key]
      }));
      const indexToDelete = slidesArray.findIndex(p => p.id === parseInt(currentSlideId));
      if (indexToDelete !== -1) {
        slidesArray.splice(indexToDelete, 1);
      }
      const newStore = {};
      const finalStore = {};
      slidesArray.forEach((item) => {
      // update the id of the presentation data after the deleted one
        const newId = item.id > parseInt(currentSlideId) ? item.id - 1 : item.id;
        newStore[newId] = { text: item.text, images: item.images, videos: item.videos };
        finalStore[presentationId] = { title: response.data.store[presentationId].title, slides: newStore };
      });

      // update the store data using PUT request
      const update = await api.put(
        '/store',
        { store: finalStore },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
      console.log(update);
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
      navigate(`/edit/${presentationId}`);
      // fetchPresentation(); // get the store data again after the presentation is deleted
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
