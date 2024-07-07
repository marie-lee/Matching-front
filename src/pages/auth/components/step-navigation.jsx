import React from 'react';
import { Stack, Box, Typography, useTheme } from '@mui/material';

const StepNavigation = ({ steps, currentStep, setCurrentStep, getStepStyles }) => {
  const theme = useTheme();

  return (
    <>
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
                  step.value === currentStep
                    ? theme.palette.primary.main
                    : theme.palette.text.disabled
                }`,
                color:
                  step.value === currentStep
                    ? theme.palette.primary.main
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
    </>
  );
};

export default StepNavigation;
