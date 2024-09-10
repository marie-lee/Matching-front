import { Dialog, DialogContent, CircularProgress, Box } from '@mui/material';

const LoadingPopup = () => {
  return (
    <Dialog open={true}>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '100px', // Optional: to ensure the dialog has some height
        }}
      >
        <Box sx={{ mb: 2 }}>
          <CircularProgress />
        </Box>
        프로필을 입력중입니다 <br /> 잠시만 기다려주세요
      </DialogContent>
    </Dialog>
  );
};

export default LoadingPopup;
