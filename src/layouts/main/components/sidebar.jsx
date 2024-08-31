import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
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
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          <ListItemButton href={'/'}>
            <ListItemText primary="pmp" sx={{ textAlign: 'center' }} />
          </ListItemButton>
          <ListItemButton href={'/task'} sx={{ mt: 7 }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <MenuBookIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton href={'/wbs/wbs-view'} sx={{ mt: 3 }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <AccessTimeIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ mt: 3 }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <GroupIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ mt: 3 }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarIcon />
            </ListItemIcon>
          </ListItemButton>
        </Box>
        <Box>
          <ListItemButton sx={{ mt: 3 }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <NotificationsIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ mb: 3 }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <PersonIcon />
            </ListItemIcon>
          </ListItemButton>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
