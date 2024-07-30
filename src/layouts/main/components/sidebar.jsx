import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 80;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5', // 사이드바 배경색 설정
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemText
            primary="pmp"
            sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <MenuBookIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <AccessTimeIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <GroupIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <StarIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <NotificationsIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <PersonIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
