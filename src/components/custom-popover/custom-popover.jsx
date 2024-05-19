import { getPosition } from '@/components/custom-popover/utils';
import { Popover } from '@mui/material';
import { menuItemClasses } from '@mui/material/MenuItem';

export const CustomPopover = ({
  open,
  children,
  arrow = 'top-right',
  sx,
  ...other
}) => {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          sx: {
            width: 'auto',
            overflow: 'inherit',
            ...style,
            [`& .${menuItemClasses.root}`]: {
              '& svg': {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
};
