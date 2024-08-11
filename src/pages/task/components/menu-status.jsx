import { ButtonBase, MenuItem, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import { CustomPopover } from '@/components/custom-popover';
import { STATUS_LIST } from '@/pages/task/constants';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

const MenuStatus = ({ editable = true }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(null);

  const handleOpenPopover = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpen(null);
  }, []);

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
      <ButtonBase disabled={!editable} onClick={editable && handleOpenPopover}>
        {renderChip(STATUS_LIST[0], editable)}
      </ButtonBase>

      <CustomPopover
        open={open}
        onClose={handleClosePopover}
        arrow={'top-left'}
        sx={{ width: 100, mt: 1 }}
      >
        {STATUS_LIST.map((status) => (
          <MenuItem key={status.label} sx={{ width: 100 }}>
            {renderChip(status)}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
};

export default MenuStatus;
