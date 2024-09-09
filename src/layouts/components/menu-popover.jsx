import { IconButton, MenuItem, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

import { CustomPopover } from '@/components/custom-popover';
import { useActiveLink } from '@/hooks/use-active-link';
import { PATHS } from '@/routes/paths';

const MENUS = [
  {
    label: '내 프로젝트 목록',
    path: PATHS.project.root,
  },
  {
    label: '매칭 현황',
    path: PATHS.match.root,
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

const MenuPopover = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpenPopover = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpen(null);
  }, []);

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };

  // ----------------------------------------------------------------------

  return (
    <>
      <IconButton onClick={handleOpenPopover}>
        <Icon icon={'iconoir:view-grid'} fontSize={28} />
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
      </CustomPopover>
    </>
  );
};

export default MenuPopover;
