import { Container } from '@mui/material';
import { HEADER } from '@/layouts/config-layout';

const Content = ({ children }) => {
  return (
    <Container
      component={'main'}
      sx={{
        flexGrow: 1,
        pt: `${HEADER.H_DESKTOP + 24}px `,
        pb: 3,
      }}
    >
      {children}
    </Container>
  );
};

export default Content;
