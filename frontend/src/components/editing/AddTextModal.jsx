import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const AddTextModal = ({ open, onClose, onAddText }) => {
  const [text, setText] = useState('');
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(10);
  const [fontSize, setFontSize] = useState(1);
  const [color, setColor] = useState('#000000');

  const handleSubmit = () => {
    const newContent = {
      id: Date.now(),
      type: 'text',
      content: text,
      style: {
        width: `${width}%`,
        height: `${height}%`,
        fontSize: `${fontSize}em`,
        color: color,
        textAlign: 'left',
        overflow: 'hidden'
      },
      position: {
        x: 0,
        y: 0
      }
    };
    onAddText(newContent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Text</DialogTitle>
      <DialogContent>
        <TextField
          label="Text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Width (%)"
          type="number"
          fullWidth
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Height (%)"
          type="number"
          fullWidth
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Font Size (em)"
          type="number"
          fullWidth
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Color"
          type="color"
          fullWidth
          value={color}
          onChange={(e) => setColor(e.target.value)}
          margin="dense"
        />
        <Button onClick={handleSubmit} color="primary">
          Add Text
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTextModal;
