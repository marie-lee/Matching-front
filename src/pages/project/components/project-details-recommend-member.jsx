import { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Chip,
  Dialog,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { STACKS_OPTIONS } from '@/pages/project/constants';
import { ProjectDetailsMemberProfiles } from '@/pages/project/components';
import { getRecommend } from '@/services/project';

// ----------------------------------------------------------------------

const memberItemStyles = {
  p: 3,
  border: (theme) => `1px solid ${theme.palette.divider}`,
  borderRadius: 1,
  '&:hover': {
    cursor: 'pointer',
    borderColor: (theme) => theme.palette.primary.main,
  },
};

const MemberItem = ({ member, ...other }) => {
  return (
    <Grid container item xs={12} {...other}>
      <Grid container sx={{ ...memberItemStyles }}>
        <Grid container alignItems={'center'} spacing={3}>
          <Grid item xs={'auto'}>
            <Avatar alt={'프로필 이미지'} sx={{ width: 70, height: 70 }} />
          </Grid>
          <Grid item xs>
            <Typography component={'p'} fontWeight={'fontWeightMedium'}>
              {member.userNm}
            </Typography>
            <Typography component={'p'} variant={'sm'} color={'text.secondary'}>
              {member.profile.introduction}
            </Typography>
            <Stack direction={'row'} flexWrap={'wrap'} gap={1} mt={1}>
              {member.profile.stack.split(',').map((skill, index) => (
                <Chip
                  key={`member_skill_${index}`}
                  label={skill}
                  size={'small'}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
// ----------------------------------------------------------------------

const ProjectDetailsRecommendMember = ({ setSelectedMember }) => {
  const { id } = useParams();
  const [profilesDialogOpen, setProfilesDialogOpen] = useState(false);
  const [recommendList, setRecommendList] = useState([]);
  const [member, setMember] = useState({});

  const fetchProject = async () => {
    try {
      const recommendList = await getRecommend(id);
      setRecommendList(recommendList.data);
      console.log('recommendList', recommendList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleClickMember = (member) => {
    setProfilesDialogOpen(true);
    setMember(member);
    setSelectedMember(member);
    console.log(member);
  };

  return (
    <Grid container>
      {/* 검색 */}
      <Grid item xs={12} py={3}>
        <Autocomplete
          multiple
          limitTags={10}
          id={'search-stack-tags'}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'조건을 추가해 주세요'}
              placeholder="희망하는 항목을 선택"
            />
          )}
          getOptionLabel={(option) => option.title}
          options={STACKS_OPTIONS}
        />
      </Grid>
      <Grid item xs={12} container spacing={3}>
        {/* 추천된 멤버 목록 */}
        <Grid item container spacing={2}>
          {recommendList.map((member, index) => (
            <MemberItem
              key={`recommend-member-${index}`}
              member={member}
              onClick={() => handleClickMember(member)}
            />
          ))}
        </Grid>
      </Grid>

      {/* 선택한 멤버의 프로필/포트폴리오 상세 조회 Dialog */}
      {/* <Dialog
        fullWidth
        maxWidth={'md'}
        open={profilesDialogOpen}
        onClose={() => setProfilesDialogOpen(false)}
      >
        <ProjectDetailsMemberProfiles member={member} />
      </Dialog> */}
    </Grid>
  );
};

export default ProjectDetailsRecommendMember;
