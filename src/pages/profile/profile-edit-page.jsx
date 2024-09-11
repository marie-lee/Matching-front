import { AppBar, Grid } from '@mui/material';
import { ProfileEditForm } from '@/pages/profile/components';
import RemoteControlBox from './components/profile-edit-remote';
import { HEADER } from '@/layouts/config-layout';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { RhfFormProvider } from '@/components/hook-form';
import { useEffect, useRef, useState } from 'react';
import { instance } from '@/services/config';
import {
  profileEditFormDefaultValues,
  profileEditFormSchema,
} from './constants';
import { yupResolver } from '@hookform/resolvers/yup';

const ProfileEditPage = () => {
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  // const { profileData } = location.state;
  const fetchProfile = async () => {
    try {
      const res = await instance.get('member/profile');
      setProfileData(res.data);
      profileEditForm.reset(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const profileEditForm = useForm({
    defaultValues: profileEditFormDefaultValues,
    resolver: yupResolver(profileEditFormSchema),
  });

  const {
    formState: { errors },
  } = profileEditForm;

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const handlePreviewOpen = () => {
    console.log('Preview Open');
  };

  // 각 섹션에 대한 참조 생성
  const refs = {
    profileRef: useRef(null),
    careerRef: useRef(null),
    skillRef: useRef(null),
    interestRef: useRef(null),
    linkRef: useRef(null),
    portfolioRef: useRef(null),
  };

  // fetchProfile() 을 받아오기 전까지 로딩 처리
  if (!profileData.profile) {
    return <div>Loading...</div>;
  }

  return (
    <RhfFormProvider form={profileEditForm}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <ProfileEditForm profileEditForm={profileEditForm} refs={refs} />
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
              refs={refs}
            />
          </AppBar>
        </Grid>
      </Grid>
    </RhfFormProvider>
  );
};

export default ProfileEditPage;
