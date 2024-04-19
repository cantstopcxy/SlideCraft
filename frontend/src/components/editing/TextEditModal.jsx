import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem } from '@mui/material';

const TextEditModal = ({ content, onClose, onSave }) => {
  const [text, setText] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial'); // Default font family

  useEffect(() => {
    if (content) {
      setText(content.content);
      setWidth(content.style.width.replace('%', ''));
      setHeight(content.style.height.replace('%', ''));
      setFontSize(content.style.fontSize.replace('em', ''));
      setColor(content.style.color);
    }
  }, [content]);

  const handleSave = () => {
    const updatedContent = {
      ...content,
      content: text,
      style: {
        ...content.style,
        width: `${width}%`,
        height: `${height}%`,
        fontSize: `${fontSize}em`,
        color: color,
        fontFamily: fontFamily // Include selected font family
      }
    };
    onSave(updatedContent);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Text</DialogTitle>
      <DialogContent>
        <TextField label="Text" fullWidth value={text} onChange={e => setText(e.target.value)} margin="dense" />
        <TextField label="Width (%)" fullWidth value={width} onChange={e => setWidth(e.target.value)} type="number" margin="dense" />
        <TextField label="Height (%)" fullWidth value={height} onChange={e => setHeight(e.target.value)} type="number" margin="dense" />
        <TextField label="Font Size (em)" fullWidth value={fontSize} onChange={e => setFontSize(e.target.value)} type="number" margin="dense" />
        <TextField label="Color" fullWidth value={color} onChange={e => setColor(e.target.value)} type="color" margin="dense" />
        <Select
          label="Font Family"
          value={fontFamily}
          onChange={e => setFontFamily(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Helvetica">Helvetica</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          <MenuItem value="Verdana">Verdana</MenuItem>
          <MenuItem value="Courier New">Courier New</MenuItem>
        </Select>
        <Button onClick={handleSave} color="primary">Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default TextEditModal;
