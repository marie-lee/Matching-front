import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ResponsiveImg } from '@/components/img';

const PortfolioDetail = ({ open, setOpen, portfolio }) => {
  const theme = useTheme();

  const portfolioData = {
    PFOL_SN: 5,
    PFOL_NM: 'Pick',
    START_DT: '2022-04-01T00:00:00.000Z',
    END_DT: '2023-05-08T00:00:00.000Z',
    PERIOD: 5,
    INTRO:
      "사용자에게 날씨별로 음악의 듣기/아티스트 정보/앨범정보를 제공해주는 웹 사이트 'Pick'입니다",
    MEM_CNT: 1,
    CONTRIBUTION: 100,
    SERVICE_STTS: 'ACTIVE',
    RESULT: '만족',
    stack: [
      {
        ST_NM: 'React',
      },
      {
        ST_NM: 'ReduxToolKit',
      },
      {
        ST_NM: 'TypeScript',
      },
    ],
    roles: [
      {
        ROLE_NM: '프론트엔드',
      },
    ],
    urls: [
      {
        URL: 'https://react-pick.netlify.app/',
        URL_INTRO: '웹 사이트 링크',
        RELEASE_YN: 0,
        OS: 'Windows',
      },
    ],
    media: [
      {
        URL: 'http://218.232.137.30:20090/matching/profile/USER_4_5.png',
        MAIN_YN: 1,
      },
      {
        URL: 'http://218.232.137.30:20090/matching/profile/USER_4_5.png',
        MAIN_YN: 1,
      },
    ],
  };
  return (
    <Dialog open={open} onClose={() => setOpen(null)} maxWidth={'lg'} fullWidth>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          포트폴리오 {'>'} {portfolio.pfolNm}
          <IconButton onClick={() => setOpen(null)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider variant="middle" />
      <DialogContent sx={{ backgroundColor: theme.palette.background.neutral }}>
        <Stack spacing={2} p={3} bgcolor={'background.default'}>
          <Grid container>
            <Grid item xs={12} md={4} sx={{ px: 1 }}>
              <ResponsiveImg
                src={portfolio.img}
                alt={portfolio.pfolNm}
                width={230}
                height={150}
              />
            </Grid>
            <Grid item container xs={12} md={8} sx={{ px: 1 }}>
              <Grid container direction="column" spacing={1}>
                <Typography variant="xl" sx={{ mx: 1 }}>
                  {portfolio.pfolNm}
                </Typography>
                <Grid
                  item
                  container
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <Typography variant="md">기간</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="sm"
                      color={theme.palette.text.secondary}
                    >{`${portfolio.startDt} ~ ${portfolio.endDt}`}</Typography>
                  </Grid>
                  {/* 역할 */}
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Typography variant="md">역할</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      {portfolioData.roles.map((role, index) => (
                        <Chip
                          key={`${portfolio.pfolNm}_role_${index}`}
                          label={role.ROLE_NM}
                          size={'small'}
                        />
                      ))}
                    </Grid>
                  </Grid>
                  {/* 링크 */}
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Typography variant="md">링크</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      {portfolioData.urls.map((url, index) => (
                        <a
                          key={`${portfolio.pfolNm}_url_${index}`}
                          href={url.URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {url.URL}
                        </a>
                      ))}
                    </Grid>
                  </Grid>
                  {/* 내 기여도 */}
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Typography variant="md">내 기여도</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant={'sm'}>
                        {portfolioData.CONTRIBUTION}%
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* 스택 */}
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Typography variant="md">스택</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      {portfolioData.stack.map((stack, index) => (
                        <Chip
                          key={`${portfolio.pfolNm}_stack_${index}`}
                          label={stack.ST_NM}
                          size={'small'}
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Grid>
                  </Grid>
                  {/* 성과 */}
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Typography variant="md">성과</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="sm">
                        {portfolioData.RESULT}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Box>
            <Typography variant="lg">프로젝트 설명</Typography>
          </Box>
          <Box>{portfolio.intro}</Box>
          <Divider />
          {/* 포트폴리오 이미지 3장 */}
          <Grid container>
            {portfolioData.media.map((media, index) => (
              <Grid item xs={4}>
                <ResponsiveImg
                  src={media.URL}
                  alt={media.URL}
                  width={230}
                  height={150}
                />
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Box>
            {/* 영상 */}
            <Typography variant="lg">영상</Typography>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/4J0d59dd-qM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDetail;
