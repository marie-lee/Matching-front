import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Sidebar from '@/layouts/main/components/sidebar';

const SidebarLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', padding: 0 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
