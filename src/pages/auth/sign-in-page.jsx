import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  Link,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from '@/store/auth-slice';
import { setName } from '@/store/name-reducer';
import { PATHS } from '@/routes/paths';
import Google from '@/assets/google.png';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import {
  sigInInFormDefaultValues,
  signInFormSchema,
} from '@/pages/auth/constants';
import { useState } from 'react';
import { postMemberLogin } from '@/services/member';

const SignInPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signInForm = useForm({
    defaultValues: sigInInFormDefaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  const { handleSubmit } = signInForm;

  const onSubmit = handleSubmit(async (data) => {
    await fetchLogin(data);
  });

  const fetchLogin = async (data) => {
    setIsPending(true);
    setErrorMessage('');

    try {
      const res = await postMemberLogin(data);
      setIsPending(false);

      if (res.status === 200) {
        dispatch(setName(res.data.USER_NM));
        dispatch(signIn({ token: res.data.accessToken }));
        navigate(PATHS.root);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    } catch (error) {
      setIsPending(false);

      if (error.status == 400 || error.status == 401) {
        if (error.data.trim() === '로그인 실패 : 유저 정보를 찾지 못했습니다.') {
          setErrorMessage('회원가입되지 않은 이메일입니다.');
        } else if (error.data == '로그인 실패 : 잘못된 비밀번호입니다.') {
          setErrorMessage('비밀번호가 틀렸습니다. 다시 시도해주세요.');
        } else {
          setErrorMessage(error.data || '인증에 실패했습니다.');
        }

      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };



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
            label={
              <Typography color={theme.palette.text.disabled}>email</Typography>
            }
          />
          <RhfTextField
            name={'password'}
            label={
              <Typography color={theme.palette.text.disabled}>
                password
              </Typography>
            }
            type={'password'}
          />
        </Stack>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
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
                    color: theme.palette.text.disabled,
                  },
                }}
              />
            }
            label={
              <Typography color={theme.palette.text.disabled} variant={'xs'}>
                Remember me
              </Typography>
            }
          />
          <Link
            color={theme.palette.login.main}
            href={PATHS.auth.findPw}
            underline="hover"
            variant={'xs'}
          >
            Forgot password?
          </Link>
        </Box>
        <LoadingButton
          loading={isPending}
          sx={{
            backgroundColor: theme.palette.login.main,
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
        color={theme.palette.text.disabled}
        sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
      >
        or
      </Typography>
      <Box
        sx={{
          border: '0 solid #D1D1D1',
          borderRadius: 10,
          p: 1,
          mt: 3,
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: '0 0 auto',
          }}
        >
          <img
            src={Google}
            alt="Google"
            style={{
              width: '20px',
              height: 'auto',
              marginLeft: '15px',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ml: 12,
          }}
        >
          <Typography
            fontWeight={'fontWeightSemiBold'}
            sx={{
              color: theme.palette.common.black,
              textAlign: 'center',
            }}
          >
            google
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}>
        <Typography
          variant={'xs'}
          sx={{ ml: 1, color: theme.palette.text.disabled }}
        >
          Don’t have an account?
        </Typography>
        <Link
          color={theme.palette.login.main}
          href={PATHS.auth.signUp}
          underline="hover"
          variant={'xs'}
          sx={{ ml: 0.5 }}
        >
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default SignInPage;
