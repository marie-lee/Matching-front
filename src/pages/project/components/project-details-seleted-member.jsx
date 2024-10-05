import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { ResponsiveImg } from '@/components/img';
import { Fragment, useState } from 'react';
import PortfolioDetail from '@/pages/profile/components/portfolio-detail';
import { HEADER } from '@/layouts/config-layout';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import RatingIcon from './profile-rating-icon';

// ----------------------------------------------------------------------

const PortfolioList = (member) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const handleClickPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <Grid container columnSpacing={2} rowSpacing={3} pt={1}>
      {member.member.portfolio?.length > 0 ?
        member.member.portfolio.map((pfol) => {
          const mainImage = pfol?.media?.split(',')[0];

          return (
            <Grid
              item
              xs={12}
              md={6}
              key={pfol.name}
              onClick={() => handleClickPortfolio(pfol)}
            >
              <Stack
                spacing={0.5}
                sx={{ cursor: 'pointer' }}
                bgcolor={'background.default'}
                border={1}
                borderColor={'divider'}
                borderRadius={1}
                minHeight={370}
              >
                {/* 대표 이미지 */}
                <ResponsiveImg
                  src={mainImage}
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

                  {/* 포트폴리오 설명 */}
                  <Typography
                    component={'p'}
                    variant={'sm'}
                    color={'text.secondary'}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.5',
                      minHeight: '4.5em',
                    }}
                  >
                    {pfol.introduction}
                  </Typography>

                  {/* 프로젝트 기간 */}
                  <Typography
                    component={'p'}
                    variant={'sm'}
                    color={'text.secondary'}
                  >
                    {`${formatDate(pfol.startDt)} ~ ${formatDate(pfol.endDt)}`}
                  </Typography>

                  {/* 사용 스킬 */}
                  <Stack
                    useFlexGap
                    flexWrap={'wrap'}
                    direction={'row'}
                    gap={0.7}
                  >
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
          );
        })
      : <Box>{/* 포트폴리오가 없을때 */}</Box>}
      {selectedPortfolio && (
        <PortfolioDetail
          open={!!selectedPortfolio}
          setOpen={() => setSelectedPortfolio(null)}
          portfolioId={selectedPortfolio.pfolSn}
        />
      )}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const ProjectDetailsSelectedMember = ({ member, handleClickReq }) => {
  return (
    <Stack width={'100%'}>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          height: '100vh',
          top: `${HEADER.H_DESKTOP + 24}px`,
          zIndex: (theme) => theme.zIndex.drawer - 101,
        }}
      >
        <Grid
          p={2}
          border={1}
          borderColor={'divider'}
          borderRadius={1}
          container
          bgcolor={'background.default'}
        >
          <Grid item container xs={12} md={'auto'} alignContent={'center'}>
            <Avatar
              alt={'프로필 이미지'}
              sx={{ width: 130, height: 130 }}
              src={member.profile?.img}
            />
          </Grid>
          <Grid item container xs md={true} pl={2}>
            {/* 이름 및 요청 버튼 */}
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant={'lg'}>{member.userNm}</Typography>
              <Button onClick={handleClickReq}>요청</Button>
            </Grid>

            {/* 한 줄 소개 */}
            <Grid item container mt={1}>
              <Typography variant={'md'}>
                {member.profile.introduction}
              </Typography>
              <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
                <Grid item xs={12} sm={2} md={2}>
                  <Typography fontWeight={'fontWeightMedium'}>링크</Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Typography
                    size={'sm'}
                    color={'text.secondary'}
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {member.profile.url}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={2}>
                  {/* 이메일없어서 링크로 일단 대체*/}
                  <Typography fontWeight={'fontWeightMedium'}>
                    이메일
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Typography
                    size={'sm'}
                    color={'text.secondary'}
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
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
              {member.profile.stack?.split(',')?.map((skill, index) => (
                <Grid item key={`stack_${index}`}>
                  <Chip label={skill} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* 경력 */}
          <Grid item xs={12} mt={4}>
            <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
              Career
            </Typography>
            <Stack spacing={1} pt={1}>
              {member.profile.career?.map((exp, index) => (
                <Fragment key={`career_${index}`}>
                  {' '}
                  {/* Fragment에 key prop 추가 */}
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
                </Fragment>
              ))}
            </Stack>
          </Grid>
        </Grid>
        {/* 포트폴리오 */}
        <Box
          sx={{
            overflowY: 'auto',
            flexGrow: 1,
            pb: 24,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#DDD',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Grid item xs={12} mt={1}>
            <PortfolioList member={member} />
          </Grid>
        </Box>
      </AppBar>
    </Stack>
  );
};

export default ProjectDetailsSelectedMember;
