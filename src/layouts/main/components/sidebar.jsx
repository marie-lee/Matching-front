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
import Notification from '@/components/notification';

const drawerWidth = 80;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isPreparingOpen, setIsPreparingOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      message:
        '새로운 메시지가 도착했습니다. q블라라라라라라라라라랄q블라라라라라라라라라랄',
    },
    { message: '업데이트가 완료되었습니다.' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const pjtSn = useSelector(selectPjtSn);

  const handleOpenPreparingService = () => {
    setIsPreparingOpen(true);
  };

  const handleClosePreparingService = () => {
    setIsPreparingOpen(false);
  };

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const handleDeleteNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index),
    );
  };

  // 모두 읽기 (모든 알림 삭제)
  const handleClearAllNotifications = () => {
    setNotifications([]); // 모든 알림을 삭제
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
            <ListItemButton onClick={handleOpenNotifications} sx={{ mt: 3 }}>
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

      <Notification
        notifications={notifications}
        anchorEl={anchorEl}
        onClose={handleCloseNotifications}
        onDeleteNotification={handleDeleteNotification}
        onClearAll={handleClearAllNotifications}
        position={'top'}
      />

      <PreparingService
        open={isPreparingOpen}
        onClose={handleClosePreparingService}
      />
    </>
  );
};

export default Sidebar;
