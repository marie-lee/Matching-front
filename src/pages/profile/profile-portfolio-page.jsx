import { Grid } from '@mui/material';
import { useState } from 'react';

import { ProfileDetails, PortfolioList } from '@/pages/profile/components';
import FloatingButton from '@/pages/guide/components/floating-button';

const ProfilePortfolioPage = () => {
  const [profileData, setProfileData] = useState([]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileDetails
          profileData={profileData}
          setProfileData={setProfileData}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <PortfolioList profileData={profileData} />
      </Grid>
      <FloatingButton initialTab={1} />
    </Grid>
    

  );
};

export default ProfilePortfolioPage;
