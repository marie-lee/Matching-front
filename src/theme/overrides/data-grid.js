import { alpha } from '@mui/material/styles';

export const dataGrid = (theme) => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.grey[300],
        },
        columnHeaders: {
          backgroundColor: theme.palette.grey[200],
        },
        footerContainer: {
          backgroundColor: `${alpha(theme.palette.grey[200], 0.5)}`,
        },
      },
    },
  };
};
