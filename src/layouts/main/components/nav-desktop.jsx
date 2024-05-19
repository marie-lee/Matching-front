import { Link, ListItemButton, Stack, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useActiveLink } from '@/hooks/use-active-link';

// ----------------------------------------------------------------------

export const NavDesktop = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2.5}>
      {data.map((list) => (
        <NavList key={list.title} data={list} theme={theme} />
      ))}
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const NavList = ({ data, theme }) => {
  const { pathname } = useLocation();
  const active = useActiveLink(data.path, !!data.children);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
  }, [pathname]);

  const handleOpenMenu =
    (() => {
      if (data.children) {
        setOpenMenu(true);
      }
    },
    [data.children]);

  const handleCloseMenu =
    (() => {
      setOpenMenu(false);
    },
    []);

  return (
    <NavItem
      open={openMenu}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
      //
      title={data.title}
      path={data.path}
      //
      active={active}
      //
      theme={theme}
    />
  );
};

// ----------------------------------------------------------------------

export const NavItem = ({ title, path, active, theme, ...other }) => {
  return (
    <Link href={path} underline="none">
      <ListItemButton
        disableRipple
        disableTouchRipple
        sx={{
          padding: 0,
          color: theme.palette.text.primary,
          fontSize: theme.typography.xl,
          fontWeight: theme.typography.fontWeightSemiBold,
          '&:hover': {
            backgroundColor: 'transparent',
          },
          ...(active && {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
          }),
        }}
        {...other}
      >
        {title}
      </ListItemButton>
    </Link>
  );
};
