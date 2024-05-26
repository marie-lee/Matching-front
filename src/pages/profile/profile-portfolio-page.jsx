import { Grid } from '@mui/material';

import { ProfileDetails, PortfolioList } from '@/pages/profile/components';

const ProfilePortfolioPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileDetails />
      </Grid>
      <Grid item xs={12} md={8}>
        <PortfolioList />
      </Grid>
    </Grid>
  );
};

export default ProfilePortfolioPage;
