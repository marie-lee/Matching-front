import { Modal, Box, Typography, Button } from '@mui/material';

const PreparingService = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          이런! 서비스 준비 중입니다!
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          확인
        </Button>
      </Box>
    </Modal>
  );
};

export default PreparingService;
