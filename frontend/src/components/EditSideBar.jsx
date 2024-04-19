import React from 'react';
// import api from '../api';
import { useTheme, Drawer, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';

import AddTextModal from './editing/AddTextModal';
import AddImageModal from './editing/AddImageModal';
import AddVideoModal from './editing/AddVideoModal';
import AddCodeModal from './editing/AddCodeModal';
import { useSlide } from '../SlideContext';

import Delete from './DeletePresentationButton';
export const drawerWidth = 240;

function EditSideBar ({ token, presentationId }) {
  const theme = useTheme();

  const [openTextModal, setOpenTextModal] = React.useState(false);
  const [openImgModal, setOpenImgModal] = React.useState(false);
  const [openVidModal, setOpenVidModal] = React.useState(false);
  const [openCodeModal, setOpenCodeModal] = React.useState(false);
  const { addContent } = useSlide();

  const handleOpenTextModal = () => {
    console.log('clicked')
    setOpenTextModal(true);
  };

  const handleCloseTextModal = () => {
    setOpenTextModal(false);
  };

  const handleOpenImgModal = () => {
    console.log('clicked')
    setOpenImgModal(true);
  };

  const handleCloseImgModal = () => {
    setOpenImgModal(false);
  };

  const handleOpenVidModal = () => {
    console.log('clicked')
    setOpenVidModal(true);
  };

  const handleCloseVidModal = () => {
    setOpenVidModal(false);
  };

  const handleOpenCodeModal = () => {
    console.log('clicked')
    setOpenCodeModal(true);
  };

  const handleCloseCodeModal = () => {
    setOpenCodeModal(false);
  };

  const handleAddContent = (newContent) => {
    addContent(newContent);
  };

  const iconSize = '2em';
  const menuItems = [
    { text: 'Text', icon: <TextFieldsRoundedIcon sx={{ fontSize: iconSize }}/>, action: handleOpenTextModal },
    { text: 'Image', icon: <InsertPhotoOutlinedIcon sx={{ fontSize: iconSize }}/>, action: handleOpenImgModal },
    { text: 'Video', icon: <VideoCameraBackOutlinedIcon sx={{ fontSize: iconSize }}/>, action: handleOpenVidModal },
    { text: 'Code', icon: <CodeOutlinedIcon sx={{ fontSize: iconSize }}/>, action: handleOpenCodeModal }
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
        <AddTextModal open={openTextModal} onClose={handleCloseTextModal} onAddText={handleAddContent} />
        <AddImageModal open={openImgModal} onClose={handleCloseImgModal} onAddImage={handleAddContent} />
        <AddVideoModal open={openVidModal} onClose={handleCloseVidModal} onAddVideo={handleAddContent} />
        <AddCodeModal open={openCodeModal} onClose={handleCloseCodeModal} onAddCode={handleAddContent} />
      </Box>
    </Drawer>
  );
}

export default EditSideBar;
