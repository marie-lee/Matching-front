import { Button, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { signIn } from '@/store/auth-slice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    dispatch(signIn({ token: 'token' }));
    navigate(PATHS.root);
  };

  return (
    <Stack spacing={2} alignItems={'center'}>
      <Typography variant={'h5'} fontWeight={'fontWeightSemiBold'}>
        프로젝트 매칭 플랫폼 로그인
      </Typography>
      <Button fullWidth onClick={handleSignIn}>
        로그인
      </Button>
    </Stack>
  );
};

export default SignInPage;
