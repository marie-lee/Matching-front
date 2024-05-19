import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Content, Header } from '@/layouts/main/components';

const MainLayout = () => {
  return (
    <Box>
      <Header />

      <Content>
        <Outlet />
      </Content>
    </Box>
  );
};

export default MainLayout;
