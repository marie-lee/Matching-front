import { Container, Stack } from '@mui/material';

import { Outlet } from 'react-router-dom';

const CenteredLayout = () => {
  return (
    <>
      <Container component={'main'}>
        <Stack
          sx={{
            py: 10,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            justifyContent: 'center',
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default CenteredLayout;
