import {
  Button,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import StepperComponent from '@/pages/wbs/components/stepperComponent';

import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
// ----------------------------------------------------------------------

const BasicInfo = () => {
  const navigate = useNavigate();

  const handleCreateWbs = () => {
    navigate(PATHS.wbs.basicinfo);
  };

  return (
    <Stack spacing={5}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        spacing={1}
      >
        <StepperComponent activeStep={1} />
        <Stack direction="row" spacing={1}>
          <Button
            color="greyButton"
            sx={{ width: '100px' }}
            variant="contained"
            onClick={handleCreateWbs}
          >
            BACK
          </Button>
          <Button
            color="greyButton"
            sx={{ width: '100px' }}
            variant="contained"
            onClick={handleCreateWbs}
          >
            NEXT
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="sm" ml={4} mr={6} fontWeight="fontWeightSemiBold">
          템플릿 Depth 정보
        </Typography>
        <RadioGroup row sx={{ width: 'auto' }}>
          <FormControlLabel
            value="Detail"
            control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
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
    </Stack>
  );
};

export default BasicInfo;