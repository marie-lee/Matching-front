import { Typography, Button, Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import intro from '@/assets/intro.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '@/pages/guide/components/floating-button';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const { isSignIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (isSignIn) {
      navigate(path);
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <>
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
                fontWeight: 'fontWeightSemiBold',
                mt: isSmallScreen ? 0 : 10,
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
                onClick={() => handleNavigation('/match')}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.login.main,
                  '&:hover': { backgroundColor: theme.palette.login.dark },
                  pl: 5,
                  pr: 5,
                  pt: 1,
                  pb: 1,
                }}
              >
                MATCHING
              </Button>
              <Button
                onClick={() => handleNavigation('/project')}
                variant="outlined"
                sx={{
                  borderColor: theme.palette.login.main,
                  color: theme.palette.login.main,
                  pl: 5.5,
                  pr: 5.5,
                  pt: 1,
                  pb: 1,
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
            <video
              autoPlay
              loop
              muted
              controls={false}
              style={{
                width: isSmallScreen ? '50%' : '130%',
                height: 'auto',
                marginTop: isSmallScreen ? '3%' : '30%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
              }}
            >
              <source src="main.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Grid>
      </Grid>
      <div
        style={{
          borderTop: '1px solid #C9C9C9',
          width: '100%',
          marginTop: isSmallScreen ? '3%' : '10%',
        }}
      ></div>

      <Typography sx={{ textAlign: 'center', mt: 1 }}>
        Feature Description
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ExpandMoreIcon />
      </Box>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid
          item
          xs={isSmallScreen ? 12 : 7}
          sx={{ textAlign: 'center', order: isSmallScreen ? 1 : 0 }}
        >
          <img
            src={intro}
            style={{
              width: isSmallScreen ? '70%' : '100%',
              height: 'auto',
              marginTop: isSmallScreen ? '0%' : '10%',
            }}
          />
        </Grid>
        <Grid xs={0.5}></Grid>
        <Grid item xs={isSmallScreen ? 12 : 4.5}>
          <Typography
            variant={'h3'}
            fontWeight={'fontWeightMedium'}
            sx={{
              textAlign: isSmallScreen ? 'center' : '',
              mt: isSmallScreen ? 1 : 20,
              mb: 3,
            }}
          >
            AI를 통한 팀원 추천
          </Typography>
          <Typography
            variant={'body1'}
            sx={{
              textAlign: isSmallScreen ? 'center' : '',
              mb: isSmallScreen ? 5 : 40,
            }}
          >
            AI를 통해 팀원을 추천받아보세요. 프로젝트에 필요한 역량을 가진
            팀원을 추천받아보세요.또한 팀원들의 프로필을 확인하고 프로젝트에
            추가하세요.
          </Typography>
        </Grid>
      </Grid>
      <FloatingButton initialTab={0} />
    </>
  );
};

export default Home;
