import { Grid } from '@mui/material';

import { ProfileEditForm } from '@/pages/profile/components';

const ProfileEditPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={10}>
        <ProfileEditForm />
      </Grid>
    </Grid>
  );
};

export default ProfileEditPage;
