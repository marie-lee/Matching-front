import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Content, Header } from '@/layouts/main/components';
import { Suspense } from 'react';

const MainLayout = () => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.background.neutral }}>
      <Header />

      <Content>
        <Suspense>
          <Outlet />
        </Suspense>
      </Content>
    </Box>
  );
};

export default MainLayout;
