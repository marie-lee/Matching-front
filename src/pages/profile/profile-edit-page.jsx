import { AppBar, Grid } from '@mui/material';
import { ProfileEditForm } from '@/pages/profile/components';
import RemoteControlBox from './components/profile-edit-remote';
import { HEADER } from '@/layouts/config-layout';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { RhfFormProvider } from '@/components/hook-form';
import { useEffect } from 'react'; 

const ProfileEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const profileData = location.state?.profileData;

  useEffect(() => {
    if (!profileData) {
      navigate('/profiles/edit-profile'); 
    }
  }, [profileData, navigate]);

  if (!profileData) {
    return null;
  }

  const profileEditForm = useForm({
    defaultValues: profileData,
  });

  const handlePreviewOpen = () => {
    console.log('Preview Open');
  };

  return (
    <RhfFormProvider form={profileEditForm}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <ProfileEditForm profileEditForm={profileEditForm} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppBar
            position="sticky"
            color="default"
            sx={{ top: `${HEADER.H_DESKTOP + 24}px` }}
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
