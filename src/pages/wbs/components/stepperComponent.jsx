import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['템플릿 선택', '기본정보 입력', '업무 입력'];

const StepperComponent = ({ activeStep }) => {
  return (
    <Stepper sx={{ width: '25%' }} activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
