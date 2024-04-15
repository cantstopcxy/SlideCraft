import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Dialog, DialogTitle, DialogContent, Button, DialogActions, DialogContentText } from '@mui/material';
import api from '../api';
import DeleteIcon from '@mui/icons-material/Delete';

import getData from '../getStore';

function Delete ({ presentationId, iconSize, token }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const deletePresentation = async () => {
    try {
      //   get store data
      const response = await getData(token);
      //   delete the specific presentation data with given id
      delete response.data.store[presentationId];
      //   update the store data using PUT request
      const update = await api.put(
        '/store',
        { store: response.data.store },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
      console.log(update);
    } catch (error) {
      console.error('Failed to delete presentation:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      // delete presentation
      await deletePresentation(presentationId, token);
      console.log('Presentation deleted:', presentationId);
      navigate('/dashboard');
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
      <List>
        <ListItem onClick={handleDelete} sx={{ mt: 'auto', justifyContent: 'center' }}>
          <ListItemButton sx={{
            flexDirection: 'column',
            textAlign: 'center',
          }}>
            <ListItemIcon sx={{ color: theme.palette.iconLight, minWidth: 'auto' }}>
              <DeleteIcon sx={{ fontSize: iconSize }} />
            </ListItemIcon>
            <ListItemText primary='Delete' sx={{ color: theme.palette.iconLight }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete the presentation permanently.
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

export default Delete;
