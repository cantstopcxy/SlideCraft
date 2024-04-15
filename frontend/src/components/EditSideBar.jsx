import React from 'react';
// import api from '../api';
import { useTheme, Drawer, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';

import Delete from './DeletePresentationButton';
export const drawerWidth = 240;

// edit view sidebar with all presentation components
// 2.3 handles each component
function EditSideBar ({ token, presentationId }) {
  const theme = useTheme();

  const iconSize = '2em';

  const menuItems = [
    { text: 'Text', icon: <TextFieldsRoundedIcon sx={{ fontSize: iconSize }}/> },
    { text: 'Image', icon: <InsertPhotoOutlinedIcon sx={{ fontSize: iconSize }}/> },
    { text: 'Video', icon: <VideoCameraBackOutlinedIcon sx={{ fontSize: iconSize }}/> },
    { text: 'Code', icon: <CodeOutlinedIcon sx={{ fontSize: iconSize }}/> }
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { bgcolor: '#2F2F33', width: drawerWidth, boxSizing: 'border-box', border: 'none' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'auto', pt: 3, px: 2 }}>
          <List disablePadding>
            {menuItems.map((item) => (
              <ListItem disablePadding key={item.text} sx={{ my: 3 }}>
                <ListItemButton sx={{ flexDirection: 'column', textAlign: 'center' }} onClick={item.action}>
                  <ListItemIcon sx={{ color: theme.palette.iconLight, minWidth: 'auto' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: theme.palette.iconLight }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Delete presentationId={presentationId} iconSize={iconSize} token={token} />
      </Box>
    </Drawer>
  );
}

export default EditSideBar;
