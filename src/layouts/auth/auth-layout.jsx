import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Content, Header } from '@/layouts/auth/components';
import { Suspense } from 'react';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.neutral,
        //height: '100vh',
        //overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <Content sx={{ flexGrow: 1 }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Content>
    </Box>
  );
};

export default AuthLayout;
