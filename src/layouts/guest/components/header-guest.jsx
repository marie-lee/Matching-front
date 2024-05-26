import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { PATHS } from '@/routes/paths';
import { HEADER } from '@/layouts/config-layout';

// ----------------------------------------------------------------------

const HeaderGuest = () => {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  return (
    <AppBar
      sx={{
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar
        sx={{
          px: `0 !important`,
          height: HEADER.H_DESKTOP,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant={'lg'}
            fontFamily={'Esamanru'}
            fontWeight={'fontWeightBold'}
            mr={5}
          >
            Project Matching
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Link href={PATHS.auth.signIn} underline={'none'}>
            <Typography variant={'md'} fontWeight={'fontWeightBold'}>
              로그인
            </Typography>
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderGuest;
