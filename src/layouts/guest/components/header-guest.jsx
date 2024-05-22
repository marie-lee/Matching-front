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
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'} mr={5}>
            프로젝트 매칭 플랫폼 로고
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Link href={PATHS.auth.signIn} underline={'none'}>
            로그인
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderGuest;
