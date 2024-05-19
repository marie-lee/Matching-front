import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';

import { ContentGuest, HeaderGuest } from '@/layouts/guest/components';

const GuestLayout = () => {
  return (
    <Box>
      <HeaderGuest />
      <ContentGuest>
        <Outlet />
      </ContentGuest>
    </Box>
  );
};

export default GuestLayout;
