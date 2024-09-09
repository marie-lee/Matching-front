import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';

import { ProfilePopover, MenuPopover } from '@/layouts/components';
import { HEADER } from '@/layouts/config-layout';
import { Icon } from '@iconify/react';
import PreparingService from '@/components/custom-popover/preparing-service';

const Header = () => {
  const theme = useTheme();

  const [isPreparingOpen, setIsPreparingOpen] = useState(false);

  const handleOpenPreparingService = () => {
    setIsPreparingOpen(true);
  };

  const handleClosePreparingService = () => {
    setIsPreparingOpen(false);
  };

  return (
    <>
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
              Hoit!
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction={'row'} spacing={1}>
              <IconButton onClick={handleOpenPreparingService}>
                <Icon icon={'iconoir:bell'} fontSize={28} />
              </IconButton>
              <MenuPopover />
              <ProfilePopover />
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <PreparingService open={isPreparingOpen} onClose={handleClosePreparingService} />
    </>
  );
};

export default Header;
