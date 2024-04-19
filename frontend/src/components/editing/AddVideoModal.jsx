import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel, Button, DialogActions } from '@mui/material';

const AddVideoModal = ({ open, onClose, onAddVideo }) => {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('');
  const [autoplay, setAutoplay] = useState(false);

  const handleSubmit = () => {
    if (!url) return;
    onAddVideo({
      id: Date.now(),
      type: 'video',
      src: url,
      style: { width: `${width}%`, height: 'auto' },
      autoplay,
      position: {
        x: 0,
        y: 0
      }
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Video</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Video URL (YouTube)'
          type='text'
          value={url}
          onChange={e => setUrl(e.target.value)}
          margin='dense'
        />
        <TextField
          fullWidth
          label='Width (%)'
          type='number'
          value={width}
          onChange={e => setWidth(e.target.value)}
          margin='dense'
        />
        <FormControlLabel
          control={<Checkbox checked={autoplay} onChange={e => setAutoplay(e.target.checked)} />}
          label='Autoplay'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add Video</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVideoModal;
