import { styled } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Typography } from '@mui/material';

const StyledBox = styled(Box)({
  position: 'relative',
  display: 'inline-block',
  width: '48px', // 아이콘 크기
  height: '48px', // 아이콘 크기
  '& .filled': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%', // 채워질 퍼센테이지
    height: '100%',
    overflow: 'hidden',
    color: '#FFB372', // 채워진 아이콘 색상
  },
  '& .empty': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: '#FFB372',
    opacity: 0.3, // 채워지지 않은 아이콘 스타일
  },
});

function RatingIcon({ value }) {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* <StyledBox>
        <Box className="filled" sx={{ width: `${value * 100}%` }}>
          <PetsIcon fontSize="inherit" style={{ fontSize: '48px' }} />
        </Box>
        <Box className="empty">
          <PetsIcon fontSize="inherit" style={{ fontSize: '48px' }} />
        </Box>
      </StyledBox>
      <Typography variant="sm" color={'GrayText'}>
        4.6
      </Typography> */}
    </Box>
  );
}

export default RatingIcon;
