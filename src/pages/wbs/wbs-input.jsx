import React, { useState } from 'react';
import { Button, Stack, Container } from '@mui/material';
import StepperComponent from '@/pages/wbs/components/stepperComponent';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

const engineers = ['김영후', '박미영', '최대한'];

const WbsInput = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(PATHS.wbs.basicinfo);
  };

  const handleNext = () => {
    navigate(PATHS.wbs.wbsInput);
  };

  return (
    <Container maxWidth="xl" sx={{ p: 3, pb: 10 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <StepperComponent activeStep={2} />
        <Stack direction="row" spacing={1}>
          <Button
            color="greyButton"
            sx={{ width: '100px' }}
            onClick={handleBack}
          >
            BACK
          </Button>
          <Button
            color="greyButton"
            sx={{ width: '100px' }}
            onClick={handleNext}
          >
            NEXT
          </Button>
        </Stack>
      </Stack>
      <Stack>asd</Stack>
    </Container>
  );
};

export default WbsInput;
