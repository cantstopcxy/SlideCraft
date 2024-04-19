import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AddCodeModal = ({ open, onClose, onAddCode }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState('1');
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('10');

  const handleSubmit = () => {
    onAddCode({
      id: Date.now(),
      type: 'code',
      code,
      language,
      style: { fontSize: `${fontSize}em`, width: `${width}%`, height: `${height}%` },
      position: {
        x: 0,
        y: 0
      }
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Add Code</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin='dense'>
          <InputLabel id='language-select-label'>Language</InputLabel>
          <Select
            labelId='language-select-label'
            id='language-select'
            value={language}
            label='Language'
            onChange={e => setLanguage(e.target.value)}
          >
            <MenuItem value='javascript'>JavaScript</MenuItem>
            <MenuItem value='python'>Python</MenuItem>
            <MenuItem value='c'>C</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin='dense'
          id='code'
          label='Code'
          type='text'
          fullWidth
          multiline
          minRows={3}
          variant='outlined'
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <TextField
          margin='dense'
          id='fontSize'
          label='Font Size (em)'
          type='text'
          fullWidth
          value={fontSize}
          onChange={e => setFontSize(e.target.value)}
        />
        <TextField
          margin='dense'
          id='width'
          label='Width (%)'
          type='text'
          fullWidth
          value={width}
          onChange={e => setWidth(e.target.value)}
        />
        <TextField
          margin='dense'
          id='height'
          label='Height (%)'
          type='text'
          fullWidth
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCodeModal;
