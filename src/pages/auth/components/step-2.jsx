import React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userInfoDefaultValues, userInfoSchema } from '@/pages/auth/constants';

const StepTwo = ({ setCurrentStep }) => {
  const theme = useTheme();

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: userInfoDefaultValues,
  });

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
                  type="submit"
                  variant="contained"
                  sx={{ width: '100%', mt: 2 }}
                  size={'small'}
                >
                  본인인증
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepTwo;
