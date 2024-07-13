import { Box, Stack, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RhfFormProvider } from '@/components/hook-form';
import {
  termsDefaultValues,
  userInfoDefaultValues,
  termsSchema,
  userInfoSchema,
} from '@/pages/auth/constants';
import { useState, useEffect } from 'react';
import { StepOne, StepTwo, StepThree } from '@/pages/auth/components';

// ----------------------------------------------------------------------
// 회원가입 화면
// ----------------------------------------------------------------------

const SignUpPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const steps = [
    { label: '이용약관 동의', value: 1 },
    { label: '회원정보 입력', value: 2 },
    { label: '회원가입 완료', value: 3 },
  ];

  const getStepStyles = (step) => {
    if (step.value === currentStep) {
      return { color: theme.palette.primary.main, fontWeight: 'bold' };
    } else {
      return { color: theme.palette.text.disabled };
    }
  };

  const signUpForm = useForm({
    defaultValues:
      currentStep === 1 ? termsDefaultValues : userInfoDefaultValues,
    resolver: yupResolver(currentStep === 1 ? termsSchema : userInfoSchema),
  });

  const { handleSubmit, trigger } = signUpForm;

  const onSubmit = async (data) => {
    if (currentStep === 1) {
      const valid = await trigger(['agreeService', 'agreePrivacy', 'over14']);
      if (valid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const valid = await trigger();
      if (valid) {
        setCurrentStep(3);
      }
    }
  };

  const fetchSignUp = async (data) => {
    setIsPending(true);
    try {
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      signUpForm.setError();
    }
  };

  // ----------------------------------------------------------------------
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        mt: 5,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          padding: 4,
        }}
      >
        {/* title */}
        <Stack alignItems={'center'} mb={7}>
          <Typography variant={'h5'} fontFamily={'Pretendard'}>
            Sign up
          </Typography>
        </Stack>

        <Box sx={{ mb: 8 }} />

        {/* navigation */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          {steps.map((step) => (
            <Stack
              key={step.value}
              direction="row"
              spacing={1}
              sx={{ textAlign: 'center', cursor: 'pointer', minWidth: 150 }}
              alignItems="center"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: `1px solid ${
                    step.value === currentStep ?
                      theme.palette.primary.main
                    : theme.palette.text.disabled
                  }`,
                  color:
                    step.value === currentStep ?
                      theme.palette.primary.main
                    : theme.palette.text.disabled,
                }}
              >
                {`0${step.value}`}
              </Box>
              <Typography sx={getStepStyles(step)} display="inline">
                {step.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box sx={{ mb: 6 }} />

        {/* step content */}
        <RhfFormProvider form={signUpForm}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}

          <Box sx={{ mb: 10 }} />

          {currentStep !== 3 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mx: 'auto',
              }}
            >
              <LoadingButton
                loading={isPending}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  width: '6vw',
                }}
              >
                확인
              </LoadingButton>
            </Box>
          )}
        </RhfFormProvider>
        <Box sx={{ mb: 10 }} />
      </Box>
    </Box>
  );
};

export default SignUpPage;
