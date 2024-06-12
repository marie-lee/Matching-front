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
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href={'/'}
            variant={'lg'}
            fontFamily={'Esamanru'}
            underline={'none'}
            fontWeight={'fontWeightMedium'}
          >
            Project Matching
          </Link>

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
