import { useState } from 'react';
import {
  Dialog,
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
  Button,
  Checkbox,
} from '@mui/material';
import Slide0 from '@/assets/guide/slide0.png';
import Slide1 from '@/assets/guide/slide1.png';
import Slide2 from '@/assets/guide/slide2.png';
import Slide3 from '@/assets/guide/slide3.png';
import Slide4 from '@/assets/guide/slide4.png';
import Slide5 from '@/assets/guide/slide5.png';
import leftArrow from '@/assets/guide/leftArrow.png';
import rightArrow from '@/assets/guide/rightArrow.png';

const GuidePopup = ({ open, onClose, initialTab, showCheckbox }) => {
  const [currentTab, setCurrentTab] = useState(initialTab || 0);
  const [showAgain, setShowAgain] = useState(true);

  const tabs = [
    'Home',
    'Profile & Portfolio',
    'Project',
    'Matching Process',
    'WBS',
    'Work board',
  ];
  const images = [Slide0, Slide1, Slide2, Slide3, Slide4, Slide5];

  const TOTAL_WIDTH = 1200;
  const BUTTON_WIDTH = 1400;
  const IMAGE_HEIGHT = 650;

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleNext = () => {
    setCurrentTab((prev) => (prev + 1) % tabs.length);
  };

  const handlePrev = () => {
    setCurrentTab((prev) => (prev - 1 + tabs.length) % tabs.length);
  };

  const handleClose = () => {
    if (!showAgain) {
      localStorage.setItem('hideGuidePopup', 'true');
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      sx={{
        '& .MuiDialog-container': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.56)',
          overflow: 'visible',
        },
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflow: 'visible',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: `${TOTAL_WIDTH}px`,
        }}
      >
        {/* 상단 탭 */}
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            mt: 2,
            width: '100%',
            '& .MuiTabs-flexContainer': {
              gap: '16px',
              justifyContent: 'center',
            },
            mb: 4,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab}
              sx={{
                flex: 1,
                height: '50px',
                maxWidth: '180px',
                borderRadius: '8px',
                backgroundColor: currentTab === index ? '#ffffff' : '#d9d9d9',
                border: currentTab === index ? '4px solid #2196F3' : 'none',
                color: currentTab === index ? '#000000' : '#878787',
                fontSize: '14px',
                fontWeight: currentTab === index ? 'bold' : 'normal',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: currentTab === index ? '#ffffff' : '#c0c0c0',
                },
              }}
            />
          ))}
        </Tabs>

        {/* 가운데 이미지 & 슬라이드 버튼 */}
        <Box
          sx={{
            mt: 0,
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: `${BUTTON_WIDTH}px`,
            height: `${IMAGE_HEIGHT}px`,
            overflow: 'visible',
          }}
        >
          {/* 왼쪽 측 버튼 */}
          <IconButton
            onClick={handlePrev}
            sx={{
              backgroundColor: 'transparent',
              zIndex: 2,
              position: 'absolute',
              left: '-100px',
              top: '40%',
              transform: 'translateY(-50%)',
            }}
          >
            <img
              src={leftArrow}
              alt="Previous"
              style={{ width: '60px', height: '60px' }}
            />
          </IconButton>

          {/* 가운데 이미지 */}
          {images[currentTab] ?
            <img
              src={images[currentTab]}
              alt={`Slide ${currentTab}`}
              style={{
                width: `${TOTAL_WIDTH}px`,
                height: '100%',
                objectFit: 'contain',
                maxHeight: `${IMAGE_HEIGHT}px`,
              }}
            />
          : <Typography>이미지를 불러올 수 없습니다.</Typography>}

          {/* 오른쪽 측 버튼 */}
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: 'transparent',
              zIndex: 2,
              position: 'absolute',
              right: '-100px',
              top: '40%',
              transform: 'translateY(-50%)',
            }}
          >
            <img
              src={rightArrow}
              alt="Next"
              style={{ width: '60px', height: '60px' }}
            />
          </IconButton>
        </Box>

        {/* 체크박스 및 닫기 버튼 */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {showCheckbox && (
            <>
              <Checkbox
                checked={!showAgain}
                onChange={(e) => setShowAgain(!e.target.checked)}
                sx={{
                  color: '#ffffff',
                  '&.Mui-checked': {
                    color: '#000000',
                  },
                }}
              />
              <Typography component="span" sx={{ color: '#ffffff' }}>
                Do not show this again.
              </Typography>
            </>
          )}
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: '#fff',
              borderColor: '#fff',
              padding: '5px 15px',
              backgroundColor: '#555454',
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default GuidePopup;
