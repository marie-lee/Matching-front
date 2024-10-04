import { useState, useEffect } from 'react';
import {
  Autocomplete,
  Avatar,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import { STACKS_OPTIONS } from '@/pages/project/constants';
import { getRecommend } from '@/services/project';
import RatingIcon from './profile-rating-icon';

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
            <Avatar
              alt={'프로필 이미지'}
              sx={{ width: 70, height: 70 }}
              src={member.profile?.img}
            />
          </Grid>
          <Grid item xs>
            <Typography component={'p'} fontWeight={'fontWeightMedium'}>
              {member.userNm}
            </Typography>
            <Typography component={'p'} variant={'sm'} color={'text.secondary'}>
              {member.profile.introduction}
            </Typography>
            <Stack direction={'row'} flexWrap={'wrap'} gap={1} mt={1}>
              {member.profile.stack?.split(',')?.map((skill, index) => (
                <Chip
                  key={`member_skill_${index}`}
                  label={skill}
                  size={'small'}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <RatingIcon></RatingIcon>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const ProjectDetailsRecommendMember = ({ setSelectedMember }) => {
  const { pjtSn } = useParams();
  const [profilesDialogOpen, setProfilesDialogOpen] = useState(false);
  const [recommendList, setRecommendList] = useState([]);
  const [member, setMember] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  const fetchProject = async () => {
    try {
      const recommendList = await getRecommend(pjtSn);
      setRecommendList(recommendList.data);

      // 첫 번째 멤버를 자동으로 선택
      if (recommendList.data.length > 0) {
        const firstMember = recommendList.data[0];
        setMember(firstMember);
        setSelectedMember(firstMember);
      }
      setIsLoading(false); // 데이터 로드 완료
    } catch (error) {
      console.error(error);
      setIsLoading(false); // 오류 발생 시에도 로딩 종료
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleClickMember = (member) => {
    setProfilesDialogOpen(true);
    setMember(member);
    setSelectedMember(member);
  };

  return (
    <Grid container pt={2}>
      {/* 로딩 중일 때 CircularProgress와 Loading... 메시지 표시 */}
      {isLoading ?
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
            }}
          >
            <CircularProgress />
            <Typography mt={2}>Loading...</Typography>
          </Box>
        </Grid>
      : <Grid item xs={12} container spacing={3}>
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
      }

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
