import { AppBar, Grid } from '@mui/material';

import { ProfileEditForm } from '@/pages/profile/components';
import RemoteControlBox from './components/profile-edit-remote';
import { HEADER } from '@/layouts/config-layout';

const ProfileEditPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <ProfileEditForm />
      </Grid>
      <Grid item xs={12} md={3}>
        <AppBar
          position="sticky"
          color="default"
          sx={{ top: `${HEADER.H_DESKTOP + 24}px ` }}
        >
          <RemoteControlBox />
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default ProfileEditPage;
