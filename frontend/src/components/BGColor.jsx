import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField, FormControl, FormLabel } from '@mui/material';
import api from '../api';

const BGColor = ({ token, presentations, setPresentations, presentationId, presentation, currentSlideId, setPresentation }) => {
  const defaultColor = presentation ? presentation.defaultBackgroundColor || '#FFFFFF' : '#FFFFFF'
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(defaultColor);
  const [defaultColorInput, setDefaultColorInput] = useState(defaultColor);
  const onColorChange = (newColor) => {
    if (presentation && presentation.slides && presentation.slides[currentSlideId]) {
      const updatedPresentation = { ...presentation };
      // make sure the presentation has an attribute of 'backgroundColor'
      if (!updatedPresentation.slides[currentSlideId].backgroundColor) {
        updatedPresentation.slides[currentSlideId].backgroundColor = 'white'; // default color is white
      }
      updatedPresentation.slides[currentSlideId].backgroundColor = newColor;
      setPresentation(updatedPresentation);
      setPresentations(prevPresentations => {
        return {
          ...prevPresentations,
          [presentationId]: updatedPresentation,
        };
      });
    }
  }
  const onDefaultColorChange = (newDefaultColor) => {
    const newPresentation = { ...presentation, defaultBackgroundColor: newDefaultColor };
    setPresentation(newPresentation);
    setPresentations(prevPresentations => {
      return {
        ...prevPresentations,
        [presentationId]: newPresentation,
      };
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleDefaultColorChange = (event) => {
    setDefaultColorInput(event.target.value);
  };

  const savePresentationsToBackend = async (presentations) => {
    try {
      const response = await api.put(
        '/store',
        { store: presentations },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyChanges = () => {
    // Apply the color changes to the current slide
    onColorChange(color);

    // Apply the default color changes to the presentation
    onDefaultColorChange(defaultColorInput);

    const updatedPresentation = {
      ...presentation,
      defaultBackgroundColor: defaultColorInput,
      slides: {
        ...presentation.slides,
        [currentSlideId]: {
          ...presentation.slides[currentSlideId],
          backgroundColor: color, // Update the backgroundColor for the current slide
        }
      }
    };
    setPresentation(updatedPresentation);
    setPresentations(prevPresentations => {
      return {
        ...prevPresentations,
        [presentationId]: updatedPresentation, // Use presentationId as the key
      };
    });

    // Save the updated presentations list to the backend
    savePresentationsToBackend(presentations);

    // Close the modal
    handleClose();
  };
  return (
    <>
      <Button onClick={handleOpen} sx={{ position: 'fixed', bottom: 20, right: 20 }}>Change Background</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Change Slide Background
        </Typography>
        <FormControl component="fieldset">
            <FormLabel component="legend">Background Color</FormLabel>
            <TextField
              label="color for current slide"
              variant="outlined"
              value={color}
              onChange={handleColorChange}
              fullWidth
              margin="normal"
            />
          </FormControl>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Default Background Color</FormLabel>
              <TextField
                label="Color for all slides"
                variant="outlined"
                value={defaultColorInput}
                onChange={handleDefaultColorChange}
                fullWidth
                margin="normal"
              />
          </FormControl>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={applyChanges} color="primary" variant="contained">
                Apply
              </Button>
            </Box>
        </Box>
    </Modal>
    </>
  );
}

export default BGColor;
