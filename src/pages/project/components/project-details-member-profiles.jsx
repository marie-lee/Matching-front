import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { ResponsiveImg } from '@/components/img';
import { PORTFOLIOS } from '@/pages/profile/constants';

// ----------------------------------------------------------------------

const PortfolioList = () => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3} pt={1}>
      {PORTFOLIOS.map((pfol) => (
        <Grid item xs={12} md={6} key={pfol.id}>
          <Stack spacing={0.5} sx={{ cursor: 'pointer' }}>
            {/* 대표 이미지 */}
            <ResponsiveImg
              src={pfol.img}
              alt={`${pfol.pfolNm}_image`}
              width={200}
              height={120}
            />

            {/* 포트폴리오 제목 */}
            <Typography component={'p'} variant={'lg'}>
              {pfol.pfolNm}
            </Typography>

            {/* 프로젝트 기간 */}
            <Typography component={'p'} variant={'sm'} color={'text.secondary'}>
              {`${pfol.startDt} ~ ${pfol.endDt}`}
            </Typography>

            {/* 사용 스킬 */}
            <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
              {pfol.stacks.map((stack, index) => (
                <Chip
                  key={`${pfol.pfolNm}_stack_${index}`}
                  label={stack.stNm}
                  size={'small'}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const ProjectDetailsMemberProfiles = ({ member }) => {
  return (
    <Grid container p={3}>
      <Grid container p={3} border={1} borderColor={'divider'} borderRadius={1}>
        <Grid item container spacing={5}>
          {/* 프로필 이미지 */}
          <Grid item xs={'auto'} alignSelf={'center'}>
            <Avatar alt={'프로필 이미지'} sx={{ width: 100, height: 100 }} />
          </Grid>

          <Grid item container xs>
            {/* 이름 및 요청 버튼 */}
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant={'xl'}>{member.name}</Typography>
              <Button>요청</Button>
            </Grid>

            {/* 한 줄 소개 */}
            <Grid item container>
              <Typography variant={'lg'}>{member.introduction}</Typography>
            </Grid>

            {/* 링크 */}
            <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
              <Grid item xs={12} sm={1}>
                <Typography fontWeight={'fontWeightMedium'}>링크</Typography>
              </Grid>
              <Grid item xs={12} md={11}>
                <Typography size={'sm'} color={'text.secondary'}>
                  {member.url}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Typography fontWeight={'fontWeightMedium'}>이메일</Typography>
              </Grid>
              <Grid item xs={12} md={11}>
                <Typography size={'sm'} color={'text.secondary'}>
                  {member.url}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12} mt={4}>
          <Divider flexItem />
        </Grid>

        {/* 주요 스킬 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            주요 스킬
          </Typography>
          <Grid container spacing={1} pt={1}>
            {member.skills.map((skill, index) => (
              <Grid item key={`stack_${index}`}>
                <Chip label={skill} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* 경력 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            경력
          </Typography>
          <Stack spacing={1} pt={1}>
            {member.company_experience?.map((exp, index) => (
              <Stack key={`career_${index}`}>
                <Typography>{exp.company_name}</Typography>
                <Typography variant={'sm'} color={'text.secondary'}>
                  {exp.duration}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* 포트폴리오 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            포트폴리오
          </Typography>
          <PortfolioList />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsMemberProfiles;
