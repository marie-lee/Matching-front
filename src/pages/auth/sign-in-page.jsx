import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from '@/store/auth-slice';
import { PATHS } from '@/routes/paths';
import Login from '@/assets/svg/login.svg';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import {
  sigInInFormDefaultValues,
  signInFormSchema,
} from '@/pages/auth/constants';
import { login } from '@/theme/palette';

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
    <Box
      sx={{
        border: '0px solid #D1D1D1',
        padding: 5,
        borderRadius: 2,
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack alignItems={'center'} mb={3}>
        <Typography variant={'h5'} fontFamily={'Pretendard'}>
          Sign in
        </Typography>
      </Stack>

      <RhfFormProvider form={signInForm} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <RhfTextField
            name={'email'}
            label={<Typography color={'text.disabled'}>email</Typography>}
          />
          <RhfTextField
            name={'password'}
            label={<Typography color={'text.disabled'}>password</Typography>}
            type={'password'}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{
                  '&.Mui-checked': {
                    color: login.main,
                  },
                }}
              />
            }
            label={
              <Typography color={'text.disabled'} variant={'xs'}>
                Remember me
              </Typography>
            }
          />
          <Link color={login.main} href="#" underline="hover" variant={'xs'}>
            Forgot password?
          </Link>
        </Box>
        <LoadingButton
          sx={{
            backgroundColor: login.main,
            borderRadius: 10,
            mt: 4,
            '&:hover': {
              backgroundColor: '#84009A',
            },
          }}
          fullWidth
          type={'submit'}
          size={'large'}
        >
          SIGN IN
        </LoadingButton>
      </RhfFormProvider>
      <Typography
        variant={'xs'}
        fontFamily={'Pretendard'}
        color={'text.disabled'}
        sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
      >
        or
      </Typography>
      <img src={Login} alt="asd" />
    </Box>
  );
};

export default SignInPage;
