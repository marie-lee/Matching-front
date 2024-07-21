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

// ----------------------------------------------------------------------

const PortfolioList = (member) => {
  console.log('member', member.member.portfolio);
  return (
    <Grid container columnSpacing={2} rowSpacing={3} pt={1}>
      {member.member.portfolio?.length > 0 ?
        member.member.portfolio.map((pfol) => (
          <Grid item xs={12} md={6} key={pfol.name}>
            <Stack
              spacing={0.5}
              sx={{ cursor: 'pointer' }}
              bgcolor={'background.default'}
              border={1}
              borderColor={'divider'}
              borderRadius={1}
            >
              {/* 대표 이미지 */}
              <ResponsiveImg
                src={pfol.media}
                alt={`${pfol.name}`}
                width={200}
                height={120}
                style={{ borderRadius: '8px' }}
              />
              <Stack p={2}>
                {/* 포트폴리오 제목 */}
                <Typography component={'p'} variant={'lg'}>
                  {pfol.name}
                </Typography>

                {/* 포트폴리오 제목 */}
                <Typography component={'p'} variant={'sm'}>
                  {pfol.introduction}
                </Typography>

                {/* 프로젝트 기간 */}
                <Typography
                  component={'p'}
                  variant={'sm'}
                  color={'text.secondary'}
                >
                  {`${pfol.startDt} ~ ${pfol.endDt}`}
                </Typography>

                {/* 사용 스킬 */}
                <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
                  {pfol.stack?.split(',').map((stack, index) => (
                    <Chip
                      key={`${pfol.name}_stack_${index}`}
                      label={stack}
                      size={'small'}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))
      : <Typography
          container
          columnSpacing={2}
          rowSpacing={3}
          pt={1}
          component={'p'}
          variant={'sm'}
          color={'text.secondary'}
        >
          포트폴리오가 없습니다.
        </Typography>
      }
    </Grid>
  );
};

// ----------------------------------------------------------------------

const ProjectDetailsSelectedMember = ({ member }) => {
  return (
    <Stack>
      <Grid
        p={2}
        border={1}
        borderColor={'divider'}
        borderRadius={1}
        container
        bgcolor={'background.default'}
      >
        <Grid item container xs={12} md={'auto'}>
          <Avatar alt={'프로필 이미지'} sx={{ width: 130, height: 130 }} />
        </Grid>
        <Grid item container xs pl={2}>
          {/* 이름 및 요청 버튼 */}
          <Grid
            item
            container
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant={'lg'}>{member.userNm}</Typography>
            <Button>요청</Button>
          </Grid>

          {/* 한 줄 소개 */}
          <Grid item container mt={1}>
            <Typography variant={'md'}>
              {member.profile.introduction}
            </Typography>
            <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
              <Grid item xs={12} sm={2}>
                <Typography fontWeight={'fontWeightMedium'}>링크</Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Typography size={'sm'} color={'text.secondary'}>
                  {member.profile.url}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                {/* 이메일없어서 링크로 일단 대체*/}
                <Typography fontWeight={'fontWeightMedium'}>이메일</Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Typography size={'sm'} color={'text.secondary'}>
                  {member.profile.url}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* 주요 스킬 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            Skills
          </Typography>
          <Grid container spacing={1} pt={1}>
            {member.profile.stack.split(',').map(
              (skill, index) => (
                console.log('skill', member.profile),
                (
                  <Grid item key={`stack_${index}`}>
                    <Chip label={skill} />
                  </Grid>
                )
              ),
            )}
          </Grid>
        </Grid>
        {/* 경력 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            Career
          </Typography>
          <Stack spacing={1} pt={1}>
            {member.profile.career?.map((exp, index) => (
              <>
                <Stack
                  key={`career_${index}`}
                  direction={'row'}
                  spacing={2}
                  alignItems={'center'}
                >
                  <Typography>{exp.careerNm}</Typography>
                  <Typography variant={'sm'} color={'text.secondary'}>
                    {exp.enteringDt} ~ {exp.quitDt}
                  </Typography>
                </Stack>
                <Divider></Divider>
              </>
            ))}
          </Stack>
        </Grid>
      </Grid>
      {/* 포트폴리오 */}
      <Grid item xs={12} mt={2}>
        <PortfolioList member={member} />
      </Grid>
    </Stack>
  );
};

export default ProjectDetailsSelectedMember;
