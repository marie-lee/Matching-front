import {
  Autocomplete,
  Avatar,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { RECOMMEND_MEMBERS, STACKS_OPTIONS } from '@/pages/project/constants';

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

const MemberItem = ({ member }) => {
  return (
    <Grid container item xs={12} md={6}>
      <Grid container sx={{ ...memberItemStyles }}>
        <Grid container alignItems={'center'} spacing={3}>
          <Grid item xs={'auto'}>
            <Avatar alt={'프로필 이미지'} sx={{ width: 70, height: 70 }} />
          </Grid>
          <Grid item xs>
            <Typography component={'p'} fontWeight={'fontWeightMedium'}>
              {member.name}
            </Typography>
            <Typography component={'p'} variant={'sm'} color={'text.secondary'}>
              {member.introduction}
            </Typography>
            <Stack direction={'row'} flexWrap={'wrap'} gap={1} mt={1}>
              {member.skills.map((skill, index) => (
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

const ProjectDetailsRecommendMember = () => {
  return (
    <Grid container p={3} bgcolor={'background.default'}>
      <Grid item container spacing={3}>
        {/* 제목 */}
        <Grid item xs={12}>
          <Typography variant={'xl'}>멤버 추천</Typography>
        </Grid>

        {/* 검색 */}
        <Grid item xs={12}>
          <Autocomplete
            multiple
            limitTags={10}
            id={'search-stack-tags'}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'기술 스택'}
                placeholder="희망하는 기술 스택을 검색"
              />
            )}
            getOptionLabel={(option) => option.title}
            options={STACKS_OPTIONS}
          />
        </Grid>

        {/* 추천된 멤버 목록 */}
        <Grid item container spacing={2}>
          {RECOMMEND_MEMBERS.map((member, index) => (
            <MemberItem key={`recommend-member-${index}`} member={member} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsRecommendMember;
