import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  useTheme,
  Modal,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userInfoDefaultValues, userInfoSchema } from '@/pages/auth/constants';
import { postEmailCertification, postEmailConfirmation } from '@/services/member';

const StepTwo = ({ setCurrentStep }) => {
  const theme = useTheme();
  const [isPending, setIsPending] = useState(false);
  const [isCodePending, setIsCodePending] = useState(false);
  const [isConfirmPending, setIsConfirmPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: userInfoDefaultValues,
  });

  const handleEmailCertification = async () => {
    setIsCodePending(true);
    try {
      const email = getValues('email');
      const payload = { USER_EMAIL: email };
      await postEmailCertification(payload);
      setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCodePending(false);
    }
  };

  const handleEmailConfirmation = async () => {
    setIsConfirmPending(true);
    try {
      const email = getValues('email');
      const verificationCode = getValues('authCode');
      const payload = { USER_EMAIL: email, verificationCode };
      await postEmailConfirmation(payload);
      setConfirmationOpen(true);
    } catch (error) {
      console.error(error);
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

  const onSubmit = (data) => {
    console.log(data);
    setCurrentStep(3);
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
                    />
                  )}
                />
              </Stack>
              <Stack direction="row" spacing={4} alignItems="center">
                <Typography sx={{ minWidth: 100 }}>본인인증</Typography>
                <LoadingButton
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  sx={{ width: '100%', mt: 2 }}
                  size={'small'}
                  loading={isPending}
                >
                  본인인증
                </LoadingButton>
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
