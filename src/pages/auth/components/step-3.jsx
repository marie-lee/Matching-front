import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import signUp from '@/assets/sign-up.png';
import { useTheme } from '@mui/material/styles';

const StepThree = ({ name }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          border: '1px solid #e0e0e0',
          p: 5,
          mb: 6,
        }}
      >
        <Typography
          sx={{ mb: 2, textAlign: 'center' }}
          fontSize={theme.typography.fontSize.xl}
        >
          {name} 님!
          <br />
          회원가입을 진심으로 환영합니다.
        </Typography>
        <img
          src={signUp}
          alt="환영합니다."
          style={{ width: 200, height: 200, marginBottom: 20, padding: 30 }}
        />
        <Typography fontSize={theme.typography.fontSize.xl}>
          프로필 입력 후 서비스를 이용해보세요!
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          width: '20%',
        }}
      >
        프로필 입력하러 가기
      </Button>
    </Box>
  );
};

export default StepThree;
