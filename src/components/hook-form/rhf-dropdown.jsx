import { ButtonBase, MenuItem, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { Controller, useFormContext } from 'react-hook-form';

import { CustomPopover } from '@/components/custom-popover';

const RhfDropdown = ({ name, options, disabled = false, canEmpty = true }) => {
  const theme = useTheme();
  const { control, setValue } = useFormContext();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(null);
  }, []);

  const renderChip = (value, showCanel) => {
    const obj = _.find(options, { value: value });

    if (obj) {
      return (
        <Stack
          width={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={showCanel ? 'space-between' : 'center'}
          spacing={0.5}
          bgcolor={obj.style.backgroundColor}
          borderRadius={1}
          px={1}
          py={0.5}
        >
          <Typography variant={'sm'} color={obj.style.color}>
            {obj.label}
          </Typography>

          {showCanel && (
            <Icon
              icon={'material-symbols:cancel'}
              fontSize={20}
              color={theme.palette.common.white}
            />
          )}
        </Stack>
      );
    }

    return <Typography color={'text.secondary'}>비어 있음</Typography>;
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <ButtonBase
              disableRipple
              disabled={disabled}
              onClick={(event) => {
                if (canEmpty && field.value.length > 0) {
                  setValue(name, '', {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                } else {
                  handleOpenMenu(event);
                }
              }}
            >
              {renderChip(field.value, canEmpty ? !disabled : false)}
            </ButtonBase>

            <CustomPopover
              open={open}
              onClose={handleCloseMenu}
              arrow={'top-left'}
              sx={{ width: 100, mt: 1 }}
            >
              {options?.map((option) => (
                <MenuItem
                  key={option.label}
                  sx={{ width: 100 }}
                  onClick={() => {
                    setValue(name, option.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  {renderChip(option.value, false)}
                </MenuItem>
              ))}
            </CustomPopover>
          </>
        )}
      />
    </>
  );
};

export default RhfDropdown;
