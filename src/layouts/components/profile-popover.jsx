import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton, MenuItem, Stack } from '@mui/material';

import { CustomPopover } from '@/components/custom-popover';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { PATHS } from '@/routes/paths';
import { signOut } from '@/store/auth-slice';

const MENUS = [
  {
    label: '프로필 & 포트폴리오',
    link: '',
  },
];

// ----------------------------------------------------------------------

export const ProfilePopover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const handleOpenPopover = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpen(null);
  }, []);

  const handleLogout = () => {
    dispatch(signOut());
    navigate(PATHS.root);
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };

  // ----------------------------------------------------------------------

  return (
    <>
      <IconButton onClick={handleOpenPopover}>
        <Icon icon={'iconoir:profile-circle'} fontSize={28} />
      </IconButton>

      <CustomPopover
        open={open}
        onClose={handleClosePopover}
        sx={{ width: 200 }}
      >
        <Stack sx={{ p: 1 }}>
          {MENUS.map((menu) => (
            <MenuItem
              key={menu.label}
              onClick={() => handleClickItem(menu.link)}
            >
              {menu.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed ' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          로그아웃
        </MenuItem>
      </CustomPopover>
    </>
  );
};
