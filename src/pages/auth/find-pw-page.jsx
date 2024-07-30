import React, { useState } from 'react';
import { Box, Stack, Typography, useTheme, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import {
  findPwFormDefaultValues,
  findPwFormSchema,
} from '@/pages/auth/constants';
import { PATHS } from '@/routes/paths';

// ----------------------------------------------------------------------
// 비밀번호 찾기 화면
// ----------------------------------------------------------------------

const FindPwPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isCodePending, setIsCodePending] = useState(false);

  const findPwForm = useForm({
    defaultValues: findPwFormDefaultValues,
    resolver: yupResolver(findPwFormSchema),
  });

  const { handleSubmit } = findPwForm;

  const onSubmit = async (data) => {
    setIsPending(true);
    try {
      console.log(data);
      navigate(PATHS.auth.resetPw);
    } catch (error) {
      findPwForm.setError('email', { message: error?.data });
    } finally {
      setIsPending(false);
    }
  };

  const handleRequestCode = async () => {
    setIsCodePending(true);
    try {
      // 인증번호 요청
    } catch (error) {
      findPwForm.setError('email', { message: error?.data });
    } finally {
      setIsCodePending(false);
    }
  };

  return (
    <>
      <RhfFormProvider form={findPwForm} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            m: 'auto',
            minHeight: '100vh',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              border: '1px solid #D1D1D1',
              paddingY: 8,
              paddingX: 5,
              borderRadius: 2,
              justifyContent: 'center',
              width: '100%',
              maxWidth: 600,
              mt: '10%',
              mb: 'auto',
            }}
          >
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                textAlign="center"
                color={theme.palette.text.primary}
              >
                비밀번호를 잊으셨나요?
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                color={theme.palette.text.secondary}
              >
                계정에서 사용하는 이름과 이메일을 입력해 주세요.
                <br />
                비밀번호를 재설정할 수 있도록 인증번호가 담긴 메일을
                보내드립니다.
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <RhfTextField name="name" label="이름" variant="outlined" />
              <Stack direction="row" spacing={2}>
                <RhfTextField
                  name="email"
                  label="이메일"
                  variant="outlined"
                  fullWidth
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LoadingButton
                    loading={isCodePending}
                    variant="contained"
                    onClick={handleRequestCode}
                    sx={{ height: '4.4vh', width: '15vh' }}
                  >
                    인증번호 요청
                  </LoadingButton>
                </Box>
              </Stack>
              <RhfTextField
                name="authCode"
                label="인증번호"
                variant="outlined"
              />
            </Stack>
            <LoadingButton
              loading={isPending}
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, height: '5vh' }}
            >
              다음
            </LoadingButton>
            <Link
              href={PATHS.auth.findId}
              variant="body2"
              sx={{ display: 'block', textAlign: 'center', mt: 2 }}
              color={theme.palette.text.secondary}
            >
              아이디 찾기
            </Link>
          </Box>
        </Stack>
      </RhfFormProvider>
    </>
  );
};

export default FindPwPage;
