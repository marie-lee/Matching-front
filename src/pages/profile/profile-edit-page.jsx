import { AppBar, Grid } from '@mui/material';

import { ProfileEditForm } from '@/pages/profile/components';
import RemoteControlBox from './components/profile-edit-remote';
import { HEADER } from '@/layouts/config-layout';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileEditFormDefaultValues } from './constants';
import { useLocation } from 'react-router-dom';
import { RhfFormProvider } from '@/components/hook-form';

const ProfileEditPage = () => {
  const location = useLocation();

  const { profileData } = location.state;
  const profileEditForm = useForm({
    defaultValues: profileData,
  });
  const handlePreviewOpen = () => {
    console.log('Preview Open');
    // console.log('profileEditForm', profileEditForm.getValues());
  };

  return (
    <RhfFormProvider form={profileEditForm}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <ProfileEditForm profileData={profileData} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppBar
            position="sticky"
            color="default"
            sx={{ top: `${HEADER.H_DESKTOP + 24}px ` }}
          >
            <RemoteControlBox
              profileEditForm={profileEditForm}
              onOpen={handlePreviewOpen}
            />
          </AppBar>
        </Grid>
      </Grid>
    </RhfFormProvider>
  );
};

export default ProfileEditPage;
