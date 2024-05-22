import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/routes/paths';

// ----------------------------------------------------------------------
// 비로그인 상태에서 접근 가능한 메인 화면
// ----------------------------------------------------------------------

const GuestPage = () => {
  const navigate = useNavigate();

  // ----------------------------------------------------------------------

  return (
    <Stack py={10}>
      <Stack spacing={2} alignItems={'center'}>
        <Typography
          variant={'h4'}
          fontWeight={'fontWeightSemiBold'}
          textAlign={'center'}
        >
          당신에게 맞는 프로젝트를 찾아드립니다!
        </Typography>

        <Typography
          variant={'h6'}
          fontWeight={'fontWeightMedium'}
          textAlign={'center'}
        >
          프로젝트 매칭부터 모니터링까지 한 눈에 확인하세요.
        </Typography>

        <Box>
          <Button onClick={() => navigate(PATHS.auth.signIn)}>
            프로젝트 매칭 플랫폼 시작하기
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default GuestPage;
