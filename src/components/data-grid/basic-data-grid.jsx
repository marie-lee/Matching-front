import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const EmptyRows = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        height: 1,
        alignItems: 'center',
        justifyContent: 'center ',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Icon
        icon={'iconoir:multiple-pages-empty'}
        fontSize={50}
        color={theme.palette.grey[400]}
      />
      <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'} mt={2}>
        프로젝트가 없습니다.
      </Typography>
    </Stack>
  );
};

const BasicDataGrid = ({ rows, columns, noRows, ...other }) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      slots={{
        noRowsOverlay: noRows || EmptyRows,
        noResultsOverlay: noRows || EmptyRows,
        loadingOverlay: LinearProgress,
      }}
      slotProps={{
        pagination: {
          labelRowsPerPage: '보기 개수',
        },
      }}
      disableRowSelectionOnClick
      disableColumnFilter
      disableColumnMenu
      sx={{ '--DataGrid-overlayHeight': '300px' }}
      {...other}
    />
  );
};

export default BasicDataGrid;
