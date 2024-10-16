import { useEffect, useState } from 'react';
import { Typography, Button, Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '@/pages/guide/components/floating-button';
import GuidePopup from '@/pages/guide/guide-popup-page'; 

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  
  const [openGuidePopup, setOpenGuidePopup] = useState(false);

  useEffect(() => {
    const hideGuidePopup = localStorage.getItem('hideGuidePopup');
    if (!hideGuidePopup) {
      setOpenGuidePopup(true);
    }
  }, []);

  const handleCloseGuidePopup = () => {
    setOpenGuidePopup(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
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

      {/* 가이드 팝업 */}
      <GuidePopup
        open={openGuidePopup}
        onClose={handleCloseGuidePopup}
        initialTab={0}
        showCheckbox={true}
      />

      {/* 플로팅 버튼 */}
      <FloatingButton initialTab={0} />
    </>
  );
};

export default Home;
