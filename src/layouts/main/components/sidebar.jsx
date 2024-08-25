import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
        <ListItemButton href={'/'}>
          <ListItemText
            primary="pmp"
            sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
          />
        </ListItemButton>
        <ListItemButton href={'/task'}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <MenuBookIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton href={'/wbs/wbs-view'}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <AccessTimeIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <GroupIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <StarIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <NotificationsIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <PersonIcon />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
