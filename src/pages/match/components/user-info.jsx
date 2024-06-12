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

const PortfolioList = ({ portfolioInfo }) => {
  return (
    <Grid container columnSpacing={2} rowSpacing={3} pt={1}>
      {portfolioInfo?.map((pfol) => {
        if (pfol.PFOL_SN === null) {
          return (
            <Grid item xs={12} key={pfol.PFOL_SN}>
              <Typography color={'text.secondary'}>
                등록된 포트폴리오가 없습니다.
              </Typography>
            </Grid>
          );
        }

        const stack = pfol?.stack?.[0].ST_NM === null ? [] : pfol?.stack;

        return (
          <Grid item xs={12} md={6} key={pfol.PFOL_SN}>
            <Stack
              spacing={0.5}
              // sx={{ cursor: 'pointer' }}
            >
              {/* 대표 이미지 */}
              <ResponsiveImg
                src={pfol?.IMG}
                alt={`${pfol.PFOL_NM}_image`}
                width={200}
                height={120}
              />

              {/* 포트폴리오 제목 */}
              <Typography component={'p'} variant={'lg'}>
                {pfol?.PFOL_NM}
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
                {stack?.map((item, index) => (
                  <Chip
                    key={`${pfol.PFOL_NM}_stack_${index}`}
                    label={item.ST_NM}
                    size={'small'}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const UserInfo = ({ profile, portfolioInfo }) => {
  console.log('profile: ', profile);
  console.log('portfolioInfo: ', portfolioInfo);

  const stack = profile?.stack?.[0].ST_NM === null ? [] : profile?.stack;

  return (
    <Grid container p={3}>
      <Grid container p={3} border={1} borderColor={'divider'} borderRadius={1}>
        <Grid item container spacing={5}>
          {/* 프로필 이미지 */}
          <Grid
            item
            container
            xs={12}
            md={'auto'}
            justifyContent={'center'}
            alignSelf={'center'}
          >
            <Avatar
              src={profile?.USER_IMG}
              alt={'프로필 이미지'}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>

          <Grid item container xs>
            {/* 이름 및 요청 버튼 */}
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant={'xl'}>{profile?.USER_NM}</Typography>
              <Button>요청</Button>
            </Grid>

            {/* 한 줄 소개 */}
            <Grid item container mt={1}>
              <Typography variant={'lg'}>{profile?.introduction}</Typography>
            </Grid>

            {/* 링크 */}
            {profile?.url && (
              <Grid item container spacing={0.5} alignItems={'center'} mt={2}>
                <Grid item xs={12} sm={12}>
                  <Typography fontWeight={'fontWeightMedium'}>링크</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  {profile.url?.map((item, index) => (
                    <Grid
                      container
                      spacing={1}
                      key={`profile_${profile?.USER_SN}_url_${index}`}
                    >
                      <Grid item>
                        <Typography size={'sm'} color={'text.secondary'}>
                          {item?.URL_ADDR}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography size={'sm'} color={'text.secondary'}>
                          {item?.URL_INTRO}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                {/*<Grid item xs={12} sm={1}>*/}
                {/*  <Typography fontWeight={'fontWeightMedium'}>이메일</Typography>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={11}>*/}
                {/*  <Typography size={'sm'} color={'text.secondary'}>*/}
                {/*    /!*{profile.url}*!/*/}
                {/*  </Typography>*/}
                {/*</Grid>*/}
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* 구분선 */}
        <Grid item xs={12} mt={4}>
          <Divider flexItem />
        </Grid>

        {/* 주요 스킬 */}
        {stack && stack.length > 0 && (
          <Grid item xs={12} mt={4}>
            <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
              주요 스킬
            </Typography>
            <Grid container spacing={1} pt={1}>
              {stack?.map((item, index) => (
                <Grid item key={`stack_${index}`}>
                  <Chip label={item.ST_NM} color={item.ST_LEVEL} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* 경력 */}
        {profile?.carrer && profile?.carrer.length > 0 && (
          <Grid item xs={12} mt={4}>
            <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
              경력
            </Typography>
            <Stack spacing={1} pt={1}>
              {profile?.carrer?.map((exp, index) => (
                <Stack key={`career_${index}`}>
                  <Typography>{exp.CARRER_NM}</Typography>
                  <Typography variant={'sm'} color={'text.secondary'}>
                    {exp.QUIT_DT === null ?
                      `${exp?.ENTERING_DT} ~ 재직 중`
                    : `${exp?.ENTERING_DT} ~ ${exp?.QUIT_DT}`}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        )}

        {/* 포트폴리오 */}
        <Grid item xs={12} mt={4}>
          <Typography variant={'lg'} fontWeight={'fontWeightSemiBold'}>
            포트폴리오
          </Typography>
          <PortfolioList portfolioInfo={portfolioInfo} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
