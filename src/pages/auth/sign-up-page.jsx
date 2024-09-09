import { Box, Stack, Typography, useTheme, Modal } from '@mui/material';
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
import { postMemberJoin } from '@/services/member';
import { signIn } from '@/store/auth-slice'; 


// ----------------------------------------------------------------------
// 회원가입 화면
// ----------------------------------------------------------------------

const SignUpPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');

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
        setUserName(data.name);
        await fetchSignUp(data);
      }
    }
  };

  const fetchSignUp = async (data) => {
    setIsPending(true);
    setErrorMessage('');
    try {
      const payload = {
        USER_NM: data.name,
        USER_EMAIL: data.email,
        PHONE: data.phone,
        USER_PW: data.password,
        USER_PW_CONFIRM: data.confirmPassword,
      };
      const response = await postMemberJoin(payload);
    
      if (response?.status === 200 && response.data?.status === 200) {
        const { accessToken, refreshToken } = response.data;
    
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        dispatch(signIn({ token: accessToken }));
  
        setCurrentStep(3);
      } else {
        throw new Error(response.data?.message || '회원가입 중 오류가 발생했습니다');
      }
    } catch (error) {
      const errorMessage = error.response?.data || error.message || '회원가입 중 오류가 발생했습니다';
      setErrorMessage(errorMessage);
      setErrorModalOpen(true);
    } finally {
      setIsPending(false);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

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

        <RhfFormProvider form={signUpForm}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && (
            <StepTwo
              setCurrentStep={setCurrentStep}
              fetchSignUp={fetchSignUp}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          )}
          {currentStep === 3 && <StepThree name={userName} />}

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

      {/* Error Modal */}
      <Modal
        open={errorModalOpen}
        onClose={handleCloseErrorModal}
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
            회원가입 실패
          </Typography>
          <Typography variant="body1" gutterBottom>
            {errorMessage}
          </Typography>
          <LoadingButton
            variant="contained"
            onClick={handleCloseErrorModal}
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            확인
          </LoadingButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default SignUpPage;
