import { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';

import { ProfilePopover, MenuPopover } from '@/layouts/components';
import { HEADER } from '@/layouts/config-layout';
import { Icon } from '@iconify/react';
import Notification from '@/components/notification';

const Header = () => {
  const theme = useTheme();

  const [notifications, setNotifications] = useState([
    { message: '새로운 메시지가 도착했습니다.' },
    { message: '업데이트가 완료되었습니다.' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar
          sx={{
            px: `0 !important`,
            height: HEADER.H_DESKTOP,
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
          }}
        >
          <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href={'/'}
              variant={'lg'}
              fontFamily={'Esamanru'}
              underline={'none'}
              fontWeight={'fontWeightMedium'}
            >
              Hoit!
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction={'row'} spacing={1}>
              <IconButton onClick={handleOpenNotifications}>
                <Icon icon={'iconoir:bell'} fontSize={28} />
              </IconButton>
              <MenuPopover />
              <ProfilePopover />
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Notification
        notifications={notifications}
        anchorEl={anchorEl}
        onClose={handleCloseNotifications}
        onDeleteNotification={handleDeleteNotification}
        onClearAll={handleClearAllNotifications}
        position={'bottom'}
      />
    </>
  );
};

export default Header;
