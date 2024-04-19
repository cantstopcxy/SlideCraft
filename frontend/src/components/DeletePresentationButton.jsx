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
      // get store data
      const response = await getData(token);
      // get presentation id array and its content then make them an object
      const presentationsArray = Object.keys(response.data.store).map(key => ({
        id: parseInt(key), // make sure ID is int
        ...response.data.store[key]
      }));
      const indexToDelete = presentationsArray.findIndex(p => p.id === parseInt(presentationId));
      if (indexToDelete !== -1) {
        presentationsArray.splice(indexToDelete, 1);
      }
      const newStore = {};
      presentationsArray.forEach((item) => {
      // update the id of the presentation data after the deleted one
        const newId = item.id > parseInt(presentationId) ? item.id - 1 : item.id;
        newStore[newId] = { title: item.title, slides: item.slides };
      });
      // update the store data using PUT request
      const update = await api.put(
        '/store',
        { store: newStore },
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
