import { AppBar, Grid } from '@mui/material';

import { ProfileEditForm } from '@/pages/profile/components';
import RemoteControlBox from './components/profile-edit-remote';
import { HEADER } from '@/layouts/config-layout';
import { useCallback, useEffect, useState } from 'react';

const ProfileEditPage = () => {
  const [profileData, setProfileData] = useState({
    profile: {},
    company: [],
    skill: [],
    interest: [],
    link: [],
    portfolio: [],
  });

  useEffect(() => {
    console.log('Profile Data:', profileData);
  }, [profileData]);

  const handlePreviewOpen = () => {
    console.log('Profile Data:', profileData);
  };

  const handleChange = (newData) => {
    const [key, id] = newData.target.name.split('-');
    if (newData.target.key === 'career') {
      // company 정보 업데이트
      const updatedCompanies = [...profileData.company];
      const index = updatedCompanies.findIndex(
        (item) => item.id === parseInt(id),
      );
      if (index !== -1) {
        updatedCompanies[index] = {
          ...updatedCompanies[index],
          [key]: newData.target.value,
        };
      } else {
        updatedCompanies.push({
          id: parseInt(id),
          [key]: newData.target.value,
        });
      }
      setProfileData((prev) => ({
        ...prev,
        company: updatedCompanies,
      }));
    } else if (newData.target.key === 'skill') {
      // skill 정보 업데이트
      let updatedSkills = [...profileData.skill];
      // 새로운 skillData를 배열에 추가
      const newSkillData = {
        id: newData.target.value.id,
        stNm: newData.target.value.stNm,
        level: newData.target.value.level,
      };
      updatedSkills.push(newSkillData);
      setProfileData((prev) => ({
        ...prev,
        skill: updatedSkills,
      }));
    } else if (newData.target.key === 'interest') {
      // interest 정보 업데이트
      let updatedInterests = [...profileData.interest];
      // 새로운 interestData를 배열에 추가
      const newInterestData = {
        itNm: newData.target.value.itNm,
      };
      updatedInterests.push(newInterestData);
      setProfileData((prev) => ({
        ...prev,
        interest: updatedInterests,
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [key]: newData.target.value },
      }));
    }
  };

  const handleRemoveEntry = (id, type) => {
    if (type === 'company') {
      const updatedCompanies = profileData.company.filter(
        (item) => item.id !== id,
      );
      setProfileData((prev) => ({
        ...prev,
        company: updatedCompanies,
      }));
    } else if (type === 'skill') {
      const updatedSkills = profileData.skill.filter((item) => item.id !== id);
      console.log(updatedSkills);
      setProfileData((prev) => ({
        ...prev,
        skill: updatedSkills,
      }));
    } else if (type === 'interest') {
      const updatedInterests = profileData.interest.filter(
        (item, index) => index !== id,
      );
      setProfileData((prev) => ({
        ...prev,
        interest: updatedInterests,
      }));
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <ProfileEditForm
          onChange={handleChange}
          onRemoveEntry={handleRemoveEntry}
        />
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
