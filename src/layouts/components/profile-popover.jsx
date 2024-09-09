import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton, MenuItem, Stack } from '@mui/material';

import { CustomPopover } from '@/components/custom-popover';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux'; 
import { PATHS } from '@/routes/paths';
import { signOut } from '@/store/auth-slice';
import { useActiveLink } from '@/hooks/use-active-link';

const MENUS = [
  {
    label: '프로필 & 포트폴리오',
    path: PATHS.profiles.root,
  },
];

const Menu = ({ menu, handleClickItem }) => {
  const active = useActiveLink(menu.path);

  return (
    <MenuItem selected={active} onClick={() => handleClickItem(menu.path)}>
      {menu.label}
    </MenuItem>
  );
};

// ----------------------------------------------------------------------

const ProfilePopover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignIn } = useSelector((state) => state.auth); 

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

  const handleLogin = () => {
    navigate(PATHS.auth.signIn);
  };

  const handleClickItem = (path) => {
    handleClosePopover();

    if (isSignIn) {
      navigate(path); 
    } else {
      navigate(PATHS.auth.signIn); 
    }
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
            <Menu
              key={menu.label}
              menu={menu}
              handleClickItem={handleClickItem}
            />
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed ' }} />

        {isSignIn ? (
          <MenuItem
            onClick={handleLogout}
            sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
          >
            로그아웃
          </MenuItem>
        ) : (
          <MenuItem
            onClick={handleLogin}
            sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'success.main' }} 
          >
            로그인
          </MenuItem>
        )}
      </CustomPopover>
    </>
  );
};

export default ProfilePopover;
