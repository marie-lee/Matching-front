import { dividerClasses } from '@mui/material/Divider';
import { checkboxClasses } from '@mui/material/Checkbox';
import { menuItemClasses } from '@mui/material/MenuItem';
import { autocompleteClasses } from '@mui/material/Autocomplete';

export const menu = (theme) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          padding: theme.spacing(0.75, 1),
          borderRadius: theme.shape.borderRadius * 0.75,
          '&:not(:last-of-type)': {
            marginBottom: 4,
          },
          [`&.${menuItemClasses.selected}`]: {
            fontWeight: theme.typography.fontWeightSemiBold,
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
          [`& .${checkboxClasses.root}`]: {
            padding: theme.spacing(0.5),
            marginLeft: theme.spacing(-0.5),
            marginRight: theme.spacing(0.5),
          },
          [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
          [`&+.${dividerClasses.root}`]: {
            margin: theme.spacing(0.5, 0),
          },
        },
      },
    },
  };
};
