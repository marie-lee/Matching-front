import React from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';

const Notification = ({
  notifications,
  anchorEl,
  onClose,
  position = 'bottom',
  onClearAll,
  onDeleteNotification,
}) => {
  const open = Boolean(anchorEl);

  const anchorOriginConfig = {
    vertical: position === 'top' ? 'top' : 'bottom',
    horizontal: 'center',
  };

  const transformOriginConfig = {
    vertical: position === 'top' ? 'bottom' : 'top',
    horizontal: 'center',
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          maxHeight: 300,
          width: '300px',
          padding: 0,
          paddingLeft: 5,
        },
      }}
      anchorOrigin={anchorOriginConfig}
      transformOrigin={transformOriginConfig}
    >
      <Box p={1}>
        <Typography
          sx={{
            fontWeight: 'fontWeightSemiBold',
          }}
        >
          알림
        </Typography>
      </Box>

      {notifications.length > 0 ?
        notifications.map((notification, index) => (
          <MenuItem
            key={index}
            onClick={() => onDeleteNotification(index)}
            sx={{
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            }}
          >
            <ListItemText
              primary={notification.message}
              primaryTypographyProps={{
                style: {
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  fontSize: '14px',
                  paddingTop: 10,
                },
              }}
            />
          </MenuItem>
        ))
      : <MenuItem disabled>
          <Typography>새로운 알림이 없습니다.</Typography>
        </MenuItem>
      }

      <Divider />

      <Box textAlign="center">
        <Button
          variant="base"
          color="primary"
          onClick={onClearAll}
          sx={{ fontSize: '12px' }}
        >
          모두 읽음
        </Button>
      </Box>
    </Menu>
  );
};

export default Notification;
