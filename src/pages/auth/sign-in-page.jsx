import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { signIn } from '@/store/auth-slice';
import { PATHS } from '@/routes/paths';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import {
  sigInInFormDefaultValues,
  signInFormSchema,
} from '@/pages/auth/constants';

// ----------------------------------------------------------------------
// 로그인 화면
// ----------------------------------------------------------------------

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInForm = useForm({
    defaultValues: sigInInFormDefaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  const { handleSubmit } = signInForm;

  const onSubmit = handleSubmit(() => {
    dispatch(signIn({ token: 'token' }));
    navigate(PATHS.root);
  });

  // ----------------------------------------------------------------------

  return (
    <Box>
      <Stack alignItems={'center'} mb={3}>
        <Typography variant={'h5'} fontWeight={'fontWeightSemiBold'}>
          프로젝트 매칭 플랫폼 로그인
        </Typography>
      </Stack>

      <RhfFormProvider form={signInForm} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <RhfTextField name={'email'} label={'이메일'} />
          <RhfTextField
            name={'password'}
            label={'비밀번호'}
            type={'password'}
          />
          <LoadingButton fullWidth type={'submit'} size={'large'}>
            로그인
          </LoadingButton>
        </Stack>
      </RhfFormProvider>
    </Box>
  );
};

export default SignInPage;
