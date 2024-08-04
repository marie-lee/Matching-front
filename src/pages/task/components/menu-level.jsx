import { ButtonBase, MenuItem, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { CustomPopover } from '@/components/custom-popover';
import { LEVEL_LIST } from '@/pages/task/constants';

const MenuLevel = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(null);

  const handleOpenPopover = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpen(null);
  }, []);

  const handleClickItem = (path) => {
    handleClosePopover();
  };

  const renderChip = (value, showCancel = false) => {
    return (
      <Stack
        width={1}
        direction={'row'}
        alignItems={'center'}
        justifyContent={showCancel ? 'space-between' : 'center'}
        spacing={0.5}
        bgcolor={value.style.backgroundColor}
        borderRadius={1}
        px={1}
        py={0.5}
      >
        <Typography variant={'sm'} color={value.style.color}>
          {value.label}
        </Typography>

        {showCancel && (
          <Icon
            icon={'material-symbols:cancel'}
            fontSize={20}
            color={theme.palette.common.white}
          />
        )}
      </Stack>
    );
  };

  return (
    <>
      <ButtonBase onClick={handleOpenPopover}>
        {renderChip(LEVEL_LIST[0], true)}
      </ButtonBase>

      <CustomPopover
        open={open}
        onClose={handleClosePopover}
        arrow={'top-left'}
        sx={{ width: 80, mt: 1 }}
      >
        {LEVEL_LIST.map((level) => (
          <MenuItem key={level.label} sx={{ width: 1 }}>
            {renderChip(level)}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
};

export default MenuLevel;
