import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { ProfilePopover, MenuPopover } from '@/layouts/components';
import { HEADER } from '@/layouts/config-layout';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const Header = () => {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  return (
    <AppBar
      sx={{
        backgroundColor: 'transparent',
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

          {/*<NavDesktop data={configNavigation} />*/}

          <Box sx={{ flexGrow: 1 }} />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
