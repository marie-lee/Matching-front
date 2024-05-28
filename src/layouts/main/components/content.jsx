import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HEADER } from '@/layouts/config-layout';
import { login } from '@/theme/palette';
import MainImg from '@/assets/mainImg.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Content = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // 화면 너비가 1200px 이하인 경우를 고려합니다.

  return (
    <Container
      component={'main'}
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        pt: `${HEADER.H_DESKTOP + 24}px `,
        pb: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={isSmallScreen ? 12 : 7}>
          <Box
            sx={{
              display: isSmallScreen ? 'flex' : 'initial',
              justifyContent: isSmallScreen ? 'center' : 'initial',
              flexDirection: 'column',
              alignItems: isSmallScreen ? 'center' : 'flex-start',
            }}
          >
            <Typography
              variant={'h2'}
              fontFamily={'sans-serif'}
              sx={{
                fontWeight: 'fontWeightMedium',
                mt: isSmallScreen ? 2 : 10,
              }}
            >
              Your dreams came true
            </Typography>
            <Typography variant={'h5'} sx={{ ml: 1 }}>
              Because you are with us.
            </Typography>
            <Box
              sx={{
                mt: isSmallScreen ? 2 : 25,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              <Button
                sx={{
                  backgroundColor: login.main,
                  '&:hover': { backgroundColor: login.dark },
                  pl: 4,
                  pr: 4,
                }}
                variant="contained"
              >
                MATCHING
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: login.main,
                  color: login.main,
                  pl: 4.5,
                  pr: 4.5,
                }}
              >
                PROJECT
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              ml: 5,
            }}
          >
            <img
              src={MainImg}
              alt="Main None Image"
              style={{
                width: isSmallScreen ? '70%' : '100%', // 작은 화면에서 이미지 크기를 줄임
                height: 'auto',
                marginTop: isSmallScreen ? '10%' : '30%',
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" sx={{ height: 1.5, mt: 30 }} />
      <Typography sx={{ textAlign: 'center', mt: 1 }}>
        Feature Description
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ExpandMoreIcon />
      </Box>
      {children}
    </Container>
  );
};

export default Content;
