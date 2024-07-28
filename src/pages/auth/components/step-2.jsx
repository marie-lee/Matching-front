import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  useTheme,
  Modal,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormContext, Controller } from 'react-hook-form';
import {
  postEmailCertification,
  postEmailConfirmation,
} from '@/services/member';

const StepTwo = ({ setCurrentStep, fetchSignUp, handleSubmit, onSubmit }) => {
  const theme = useTheme();
  const [isCodePending, setIsCodePending] = useState(false);
  const [isConfirmPending, setIsConfirmPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const handleEmailCertification = async () => {
    setIsCodePending(true);
    setEmailError('');
    try {
      const email = getValues('email');
      if (!email) {
        throw new Error('이메일이 제공되지 않았습니다');
      }
      const payload = { USER_EMAIL: email };
      await postEmailCertification(payload);
      setOpen(true);
    } catch (error) {
      setEmailError(error.message || '이메일 인증 요청 실패');
    } finally {
      setIsCodePending(false);
    }
  };

  const handleEmailConfirmation = async () => {
    setIsConfirmPending(true);
    setConfirmationError('');
    try {
      const email = getValues('email');
      const verificationCode = getValues('authCode');
      const payload = { USER_EMAIL: email, verificationCode };
      await postEmailConfirmation(payload);
      setConfirmationOpen(true);
    } catch (error) {
      setConfirmationError(error.message || '인증 코드가 일치하지 않습니다');
    } finally {
      setIsConfirmPending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '80%',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box
            sx={{
              width: '65%',
              mt: 7,
              mb: 7,
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>이름</Typography>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                      value={field.value || ''}
                    />
                  )}
                />
              </Stack>
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>이메일</Typography>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                      value={field.value || ''}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'flex-end' }}
                  size={'small'}
                  onClick={handleEmailCertification}
                  disabled={isCodePending}
                >
                  인증
                </Button>
              </Stack>
              {emailError && (
                <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                  {emailError}
                </Alert>
              )}
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>인증번호</Typography>
                <Controller
                  name="authCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      error={!!errors.authCode}
                      helperText={
                        errors.authCode ? errors.authCode.message : ''
                      }
                      value={field.value || ''}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'flex-end' }}
                  size={'small'}
                  onClick={handleEmailConfirmation}
                  disabled={isConfirmPending}
                >
                  확인
                </Button>
              </Stack>
              {confirmationError && (
                <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                  {confirmationError}
                </Alert>
              )}
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>전화번호</Typography>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ''}
                      value={field.value || ''}
                    />
                  )}
                />
              </Stack>
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>비밀번호</Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      variant="standard"
                      fullWidth
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ''
                      }
                      value={field.value || ''}
                    />
                  )}
                />
              </Stack>
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>비밀번호 확인</Typography>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      variant="standard"
                      fullWidth
                      error={!!errors.confirmPassword}
                      helperText={
                        errors.confirmPassword ?
                          errors.confirmPassword.message
                        : ''
                      }
                      value={field.value || ''}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
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
      <Modal
        open={confirmationOpen}
        onClose={handleConfirmationClose}
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
            이메일 인증이 완료되었습니다.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirmationClose}
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

export default StepTwo;
