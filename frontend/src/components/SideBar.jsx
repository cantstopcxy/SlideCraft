import React from 'react';
import { useTheme, Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export const drawerWidth = 240;

// dashboard sidebar
function SideBar ({ activePage }) {
  const theme = useTheme();

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 'none' },
      }}
    >
      <Toolbar/>
      <Box sx={{ overflow: 'auto', pt: 3, px: 2 }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                bgcolor: activePage === 'home' ? '#ddd' : 'inherit',
                borderRadius: 2
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.iconDark }}>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;
