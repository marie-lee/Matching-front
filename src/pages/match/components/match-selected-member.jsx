import {
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

// ----------------------------------------------------------------------

export const GetPortfolioList = ({ portfolio }) => {
  console.log('portfolio', portfolio);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const handleClickPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    console.log('selectedPortfolio', selectedPortfolio);
  };

  return (
    <Grid container columnSpacing={2} rowSpacing={3} pt={1}>
      {portfolio?.length > 0 ?
        portfolio.map((pfol) => (
          <Grid
            item
            xs={12}
            md={6}
            key={pfol.PFOL_NM}
            onClick={() => handleClickPortfolio(pfol)}
          >
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
                src={pfol.IMG}
                alt={`${pfol.name}`}
                width={200}
                height={120}
                style={{ borderRadius: '8px' }}
              />
              <Stack p={2}>
                {/* 포트폴리오 제목 */}
                <Typography component={'p'} variant={'lg'}>
                  {pfol.PFOL_NM}
                </Typography>

                {/* 프로젝트 기간 */}
                <Typography
                  component={'p'}
                  variant={'sm'}
                  color={'text.secondary'}
                >
                  {`${pfol.START_DT} ~ ${pfol.END_DT}`}
                </Typography>

                {/* 사용 스킬 */}
                <Stack useFlexGap flexWrap={'wrap'} direction={'row'} gap={0.7}>
                  {pfol.stack?.map((stack, index) => (
                    <Chip
                      key={`${pfol.PFOL_NM}_stack_${index}`}
                      label={stack.ST_NM}
                      size={'small'}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))
      : <Box>{/* 포트폴리오가 없을때 */}</Box>}
      {selectedPortfolio && (
        <PortfolioDetail
          open={!!selectedPortfolio}
          setOpen={() => setSelectedPortfolio(null)}
          portfolioId={selectedPortfolio.PFOL_SN}
        />
      )}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const MatchSelectedMember = ({ member }) => {
  console.log('member', member);
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
            <Typography variant={'lg'}>{member?.profile?.USER_NM}</Typography>
            <Button>요청</Button>
          </Grid>

          {/* 한 줄 소개 */}
          <Grid item container mt={1}>
            <Typography variant={'md'}>{member.profile.PF_INTRO}</Typography>
            <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
              {member.profile.url?.map((url, index) => (
                <Fragment key={`url_${index}`}>
                  <Grid item xs={12} sm={2}>
                    <Typography fontWeight={'fontWeightMedium'}>
                      {url.URL_INTRO}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography size={'sm'} color={'text.secondary'}>
                      {url.URL_ADDR}
                    </Typography>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* 주요 스킬 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            주요 스킬
          </Typography>
          <Divider />
          <Grid container spacing={1} pt={1}>
            {member.profile?.stack?.map((skill, index) => (
              <Grid item key={`stack_${index}`}>
                <Chip key={`chip_${index}`} label={skill.ST_NM} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* 경력 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            경력
          </Typography>
          <Divider></Divider>
          <Stack spacing={1} pt={1}>
            {member.profile.carrer?.map((exp, index) => (
              <Fragment key={`career_${index}`}>
                {/* Fragment에 key prop 추가 */}
                <Stack
                  key={`career_${index}`}
                  direction={'row'}
                  spacing={2}
                  alignItems={'center'}
                >
                  <Typography>{exp.CARRER_NM}</Typography>
                  <Typography variant={'sm'} color={'text.secondary'}>
                    {exp.ENTERING_DT} ~ {exp.QUIT_DT}
                  </Typography>
                </Stack>
                <Divider></Divider>
              </Fragment>
            ))}
          </Stack>
        </Grid>
      </Grid>
      {/* 포트폴리오 */}
      <Grid item xs={12} mt={2}>
        <GetPortfolioList portfolio={member.portfolioInfo} />
      </Grid>
    </Stack>
  );
};

export default MatchSelectedMember;
