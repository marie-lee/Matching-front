import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { ProfilePopover, MenuPopover } from '@/layouts/components';
import { HEADER } from '@/layouts/config-layout';

// ----------------------------------------------------------------------

const Header = () => {
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
          <Typography
            variant={'lg'}
            fontFamily={'Esamanru'}
            fontWeight={'fontWeightMedium'}
            mr={5}
          >
            Project Matching
          </Typography>

          {/*<NavDesktop data={configNavigation} />*/}

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction={'row'} spacing={1}>
            <MenuPopover />
            <ProfilePopover />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
