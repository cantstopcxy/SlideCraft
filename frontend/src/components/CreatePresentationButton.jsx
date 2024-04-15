import React from 'react';
import { MenuItem, Box, Typography, Button, TextField, Stack, Modal } from '@mui/material';
// import api from '../api';

import createPresentation from './NewPresentation';

function CreateButton ({ token, addNewPresentation }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <MenuItem onClick={handleOpen} sx={{ color: '#333333' }}>Create</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            Presentation Title:
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            textAlign="center"
          >
            <TextField id="standard-basic" label="Title" variant="standard" value={title} onChange={handleTitleChange}/>
          </Box>
          <br />
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" onClick={() => createPresentation(event, token, title, handleClose, addNewPresentation)}>Create</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default CreateButton;
