import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { NavDesktop } from '@/layouts/main/components/nav-desktop';
import { configNavigation } from '@/layouts/guest/config-navigation';

const HeaderGuest = () => {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar
        sx={{
          px: `0 !important`,
          height: 72,
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'} mr={5}>
            프로젝트 매칭 플랫폼 로고
          </Typography>

          <NavDesktop data={configNavigation} />

          <Box sx={{ flexGrow: 1 }} />

          <Link href={'/sign-in'} underline={'none'}>
            로그인
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderGuest;
