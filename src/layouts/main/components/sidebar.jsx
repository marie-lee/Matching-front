import { useState } from 'react';
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
import PreparingService from '@/components/custom-popover/preparing-service';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { getWbs } from '@/services/wbs';
import { useSelector } from 'react-redux';
import { selectPjtSn } from '@/store/pjtsn-reducer';

const drawerWidth = 80;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isPreparingOpen, setIsPreparingOpen] = useState(false);
  const pjtSn = useSelector(selectPjtSn);

  const handleOpenPreparingService = () => {
    setIsPreparingOpen(true);
  };

  const handleClosePreparingService = () => {
    setIsPreparingOpen(false);
  };

  const handleWbs = async () => {
    const res1 = await getWbs(pjtSn);

    if (res1.data.wbsData.length == 0) {
      alert('wbs를 만든 후 이용해주세요.');
    } else {
      navigate(PATHS.wbs.wbsView);
    }
  };
  return (
    <>
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
              <ListItemText primary="Hoit!" sx={{ textAlign: 'center' }} />
            </ListItemButton>
            <ListItemButton href={'/task'} sx={{ mt: 7 }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <MenuBookIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={handleWbs} sx={{ mt: 3 }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <AccessTimeIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton href={PATHS.group.root} sx={{ mt: 3 }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <GroupIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={handleOpenPreparingService} sx={{ mt: 3 }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <StarIcon />
              </ListItemIcon>
            </ListItemButton>
          </Box>
          <Box>
            <ListItemButton onClick={handleOpenPreparingService} sx={{ mt: 3 }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <NotificationsIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton href={'/profiles'} sx={{ mb: 3 }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <PersonIcon />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </List>
      </Drawer>

      <PreparingService
        open={isPreparingOpen}
        onClose={handleClosePreparingService}
      />
    </>
  );
};

export default Sidebar;
