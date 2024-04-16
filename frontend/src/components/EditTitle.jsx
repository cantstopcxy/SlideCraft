import {
  MenuItem,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Modal,
} from '@mui/material';
import React from 'react';
import { style } from './CreatePresentationButton';
import changeTitle from './NewTitle';

const EditTitle = ({ presentationId, title, updateTitle, token }) => {
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MenuItem onClick={handleOpen} sx={{ color: '#333333' }}>
        Edit
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            textAlign='center'
          >
            Change Presentation Title:
          </Typography>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
            textAlign='center'
          >
            <TextField
              id='standard-basic'
              label='Title'
              variant='standard'
              value={newTitle}
              onChange={handleTitleChange}
            />
          </Box>
          <br />
          <Stack spacing={2} direction='row' justifyContent='center'>
            <Button
              variant='contained'
              onClick={() =>
                changeTitle(
                  event,
                  token,
                  presentationId,
                  newTitle,
                  updateTitle,
                  handleClose
                )
              }
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default EditTitle;
