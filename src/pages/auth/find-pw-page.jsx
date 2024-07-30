import React, { useState } from 'react';
import { Box, Stack, Typography, useTheme, Link, Modal, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import { findPwFormDefaultValues, findPwFormSchema } from '@/pages/auth/constants';
import { PATHS } from '@/routes/paths';
import { postPwCertification, postPwVerification } from '@/services/member';

const FindPwPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isCodePending, setIsCodePending] = useState(false);
  const [open, setOpen] = useState(false);

  const findPwForm = useForm({
    defaultValues: findPwFormDefaultValues,
    resolver: yupResolver(findPwFormSchema),
  });

  const { handleSubmit, trigger, getValues } = findPwForm;

  const onSubmit = async (data) => {
    setIsPending(true);
    try {
      const { email, authCode } = data;
      const valid = await trigger(['email', 'authCode']);
      if (valid) {
        await postPwVerification({ USER_EMAIL: email, verificationCode: authCode });
        navigate(PATHS.auth.resetPw, { state: { email } });
      }
    } catch (error) {
      findPwForm.setError('authCode', { message: error?.response?.data || '인증에 실패했습니다.' });
    } finally {
      setIsPending(false);
    }
  };

  const handleRequestCode = async () => {
    setIsCodePending(true);
    try {
      const { name, email } = getValues();
      const valid = await trigger(['name', 'email']);
      if (valid) {
        await postPwCertification({ USER_NM: name, USER_EMAIL: email });
        setOpen(true);
      }
    } catch (error) {
      findPwForm.setError('email', { message: error.response?.data || error.message || '인증번호 요청에 실패했습니다.' });
    } finally {
      setIsCodePending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <RhfTextField
                  name="email"
                  label="이메일"
                  variant="outlined"
                  fullWidth
                />
                <LoadingButton
                  loading={isCodePending}
                  variant="contained"
                  onClick={handleRequestCode}
                  sx={{ minWidth: 110 }}
                >
                  인증번호 요청
                </LoadingButton>
              </Box>
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

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 4,
            borderRadius: 1,
            boxShadow: 24,
            width: '60%',
            maxWidth: '520px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            이메일로 인증번호를 전송했습니다.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClose}
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            확인
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FindPwPage;
