import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';

const AddImageModal = ({ open, onClose, onAddImage }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [isUrl, setIsUrl] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUrl(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event) => {
    setIsUrl(true);
    setImageSrc(event.target.value);
  };

  const handleSubmit = () => {
    if (!imageSrc) return;
    onAddImage({
      id: Date.now(),
      type: 'image',
      src: imageSrc,
      style: {
        width: `${width}%`,
        height: `${height}%`
      },
      alt: altText,
      position: {
        x: 0,
        y: 0
      }
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add an Image</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Width (%)"
          type="number"
          value={width}
          onChange={e => setWidth(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Height (%)"
          type="number"
          value={height}
          onChange={e => setHeight(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Image URL"
          type="text"
          value={isUrl ? imageSrc : ''}
          onChange={handleUrlChange}
          margin="dense"
        />
        <TextField
          fullWidth
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Alt Text"
          value={altText}
          onChange={e => setAltText(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add Image</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddImageModal;
