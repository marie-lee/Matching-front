import {
  Box,
  Stack,
  Typography,
  useTheme,
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
  signUpFormDefualtValues,
  signUpFormSchema,
} from '@/pages/auth/constants';
import { useState } from 'react';
import { postMemberLogin } from '@/services/member';
import { StepOne, StepThree, StepTwo } from '@/pages/auth/components';

// ----------------------------------------------------------------------
// 로그인 화면
// ----------------------------------------------------------------------

const SignUpPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
    defaultValues: signUpFormDefualtValues,
    resolver: yupResolver(signUpFormSchema),
  });

  const { handleSubmit } = signUpForm;

  const onSubmit = async (data) => {
    console.log("Form submitted:", data); // 콘솔에 폼 데이터를 출력
    await fetchSignUp(data);
    if (currentStep === 1) {
      setCurrentStep(2); // StepOne에서 StepTwo로 이동
    } else if (currentStep === 2) {
      setCurrentStep(3); // StepTwo에서 StepThree로 이동
    }
  };

  const fetchSignUp = async (data) => {
    setIsPending(true);
    try {
      // Your sign-up logic here
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
        alignItems: 'center',
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
        <Stack alignItems={'center'} mb={7}>
          <Typography variant={'h5'} fontFamily={'Pretendard'}>
            Sign up
          </Typography>
        </Stack>
        <Box sx={{ mb: 8 }} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          {steps.map((step) => (
            <Stack
              key={step.value}
              onClick={() => setCurrentStep(step.value)}
              direction="row" // direction을 "row"로 설정
              spacing={1}
              sx={{ textAlign: 'center', cursor: 'pointer', minWidth: 150 }}
              alignItems="center" // alignItems를 "center"로 설정
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

        <RhfFormProvider form={signUpForm}>
          {currentStep === 1 && (
            <StepOne signUpForm={signUpForm} fetchSignUp={fetchSignUp} setCurrentStep={setCurrentStep} isPending={isPending} theme={theme} />
          )}
          {currentStep === 2 && (
            <StepTwo signUpForm={signUpForm} setCurrentStep={setCurrentStep} isPending={isPending} theme={theme} />
          )}
          {currentStep === 3 && <StepThree />}

          <Box sx={{ mb: 10 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center', // 수평 중앙 정렬
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
                width: '6vw', // 너비를 10vw로 설정
              }}
            >
              확인
            </LoadingButton>
          </Box>
        </RhfFormProvider>
        <Box sx={{ mb: 10 }} />
      </Box>
    </Box>
  );
};

export default SignUpPage;
