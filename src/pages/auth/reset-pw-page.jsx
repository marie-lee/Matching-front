import React, { useState } from 'react';
import { Box, Stack, Typography, useTheme, Button, Modal } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RhfFormProvider, RhfTextField } from '@/components/hook-form';
import {
  resetPwFormDefaultValues,
  resetPwFormSchema,
} from '@/pages/auth/constants';
import { PATHS } from '@/routes/paths';
import { postResetPassword } from '@/services/member';

const ResetPwPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetPwForm = useForm({
    defaultValues: resetPwFormDefaultValues,
    resolver: yupResolver(resetPwFormSchema),
  });

  const { handleSubmit } = resetPwForm;
  const email = location.state?.email;

  if (!email) {
    setErrorMessage('이메일이 전달되지 않았습니다.');
    setOpen(true);
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    try {
      const { newPassword, confirmPassword } = data;
      await postResetPassword({
        USER_EMAIL: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      setErrorMessage('');
      setOpen(true);
    } catch (error) {
      setErrorMessage(error?.response?.data || '비밀번호 변경에 실패했습니다.');
      setOpen(true);
    } finally {
      setIsPending(false);
    }
  });

  const handleClose = () => {
    setOpen(false);
    if (!errorMessage) navigate(PATHS.auth.signIn);
  };

  return (
    <>
      <RhfFormProvider form={resetPwForm} onSubmit={onSubmit}>
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
              mt: '15%',
              mb: 'auto',
            }}
          >
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                textAlign="center"
                color={theme.palette.text.primary}
              >
                비밀번호 재설정
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <RhfTextField
                name="newPassword"
                label="새 비밀번호"
                type="password"
                variant="outlined"
              />
              <RhfTextField
                name="confirmPassword"
                label="새 비밀번호 확인"
                type="password"
                variant="outlined"
              />
            </Stack>
            <Typography
              variant="body2"
              textAlign="left"
              color={theme.palette.text.secondary}
              sx={{ mt: 2 }}
            >
              • 다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는
              사용하지 마세요.
              <br />• 안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해
              주세요.
            </Typography>
            <LoadingButton
              loading={isPending}
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, height: '4vh' }}
            >
              변경하기
            </LoadingButton>
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
          backdropFilter: 'blur(5px)',
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
            {errorMessage || '비밀번호가 성공적으로 변경되었습니다.'}
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

export default ResetPwPage;
