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
import { getPortfolioDetail } from '@/services/member';
import { useEffect, useState } from 'react';
import { MemberReview } from '@/pages/review/components';

const PortfolioDetail = ({ open, setOpen, portfolioId }) => {
  console.log('portfolioId', portfolioId);
  const theme = useTheme();
  const [portfolioData, setPortfolioData] = useState(null);
  const [peerReview, setPeerReview] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getPortfolioDetail(portfolioId);
      const data = res.data;
      setPortfolioData(data);

      const peerReview = data.RATE.map((item) => {
        return {
          RATE_TEXT: item,
        };
      });
      setPeerReview(peerReview);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!portfolioData) {
    return null;
  }

  return (
    <Dialog open={open} onClose={() => setOpen(null)} maxWidth={'lg'} fullWidth>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          포트폴리오 {'>'} {portfolioData.PFOL_NM}
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
                src={portfolioData.media[0].URL}
                alt={portfolioData.PFOL_NM}
                width={230}
                height={150}
              />
            </Grid>
            <Grid item container xs={12} md={8} sx={{ px: 1 }}>
              <Grid container direction="column" spacing={1}>
                <Typography variant="xl" sx={{ mx: 1 }}>
                  {portfolioData.PFOL_NM}
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
                    >
                      {`${new Date(portfolioData.START_DT).toISOString().split('T')[0]} ~ ${new Date(portfolioData.END_DT).toISOString().split('T')[0]}`}
                    </Typography>
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
                          key={`${portfolioData.PFOL_NM}_role_${index}`}
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
                          key={`${portfolioData.PFOL_NM}_url_${index}`}
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
                          key={`${portfolioData.pfolNm}_stack_${index}`}
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
          <Box>{portfolioData.INTRO}</Box>
          <Divider />
          {/* 포트폴리오 이미지 3장 */}
          <Grid container>
            {portfolioData.media.map((media, index) => (
              <Grid item key={`${portfolioData.PFOL_NM}_media_${index}`} xs={4}>
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
            {/* 영상이 없어 새로 받아야 댐 */}
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/4J0d59dd-qM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
          <Divider />
          <MemberReview review={peerReview}></MemberReview>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDetail;
