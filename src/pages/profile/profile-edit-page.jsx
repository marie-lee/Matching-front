import { AppBar, Grid } from '@mui/material';

import { ProfileEditForm } from '@/pages/profile/components';
import RemoteControlBox from './components/profile-edit-remote';
import { HEADER } from '@/layouts/config-layout';
import { useCallback, useEffect, useState } from 'react';

const ProfileEditPage = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    console.log('Profile Data:', profileData);
    // This will log the updated profileData whenever it changes
  }, [profileData]); // Dependency array, re-run the effect when profileData changes

  const handlePreviewOpen = () => {
    console.log('Profile Data:', profileData);
    // 팝업 열림 이벤트 처리 및 profileData 사용
  };

  const handleChange = (newData) => {
    setProfileData(newData); // Update state
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <ProfileEditForm onChange={handleChange} />
      </Grid>
      <Grid item xs={12} md={3}>
        <AppBar
          position="sticky"
          color="default"
          sx={{ top: `${HEADER.H_DESKTOP + 24}px ` }}
        >
          <RemoteControlBox onOpen={handlePreviewOpen} />
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default ProfileEditPage;
