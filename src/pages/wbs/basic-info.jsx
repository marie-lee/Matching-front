import {
  Button,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from '@mui/material';
import StepperComponent from '@/pages/wbs/components/stepperComponent';
import TemplateTable from '@/pages/wbs/components/template-table';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import ProjectInfo from '@/pages/wbs/components/projectInfo';
import UserAdd from '@/pages/wbs/components/userAdd';

const BasicInfo = () => {
  const navigate = useNavigate();

  const handleInputWbs = () => {
    navigate(PATHS.wbs.wbsInput);
  };

  const handleBack = () => {
    navigate(PATHS.wbs.createWbs);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 3, pb: 10 }}>
      <Stack spacing={5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <StepperComponent activeStep={1} />
          <Stack direction="row" spacing={1}>
            <Button
              color="greyButton"
              sx={{ width: '100px' }}
              variant="contained"
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              color="greyButton"
              sx={{ width: '100px' }}
              variant="contained"
              onClick={handleInputWbs}
            >
              NEXT
            </Button>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography
            variant="sm"
            ml={3}
            mr={6}
            fontWeight="fontWeightSemiBold"
          >
            템플릿 Depth 정보
          </Typography>
          <RadioGroup row sx={{ width: 'auto' }}>
            <FormControlLabel
              value="Detail"
              control={
                <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
              }
              label={<Typography variant="sm">Detail</Typography>}
              sx={{ mr: 1 }}
            />
            <FormControlLabel
              value="Roughly"
              control={
                <Radio
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 18 },
                    marginLeft: '20px',
                  }}
                />
              }
              label={<Typography variant="sm">Roughly</Typography>}
            />
          </RadioGroup>
        </Stack>
        <TemplateTable />
        <ProjectInfo />
        <UserAdd />
      </Stack>
    </Container>
  );
};

export default BasicInfo;
