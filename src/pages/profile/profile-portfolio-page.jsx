import { Grid } from '@mui/material';

import { ProfileDetails } from '@/pages/profile/components';

const ProfilePortfolioPage = () => {
  return (
    <Grid container>
      <Grid xs={12} md={3}>
        <ProfileDetails />
      </Grid>
      <Grid xs={12} md={9}>
        포트폴리오
      </Grid>
    </Grid>
  );
};

export default ProfilePortfolioPage;
