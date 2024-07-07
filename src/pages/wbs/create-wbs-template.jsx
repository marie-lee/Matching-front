/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { template1, template2, template3 } from './constants';
import { useState } from 'react';

const steps = ['템플릿 선택', '기본정보 입력', '업무 입력'];

const CreateWbsTemplatePage = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (id) => {
    setSelectedBox(id === selectedBox ? null : id);
  };

  const renderTemplate = (template) => {
    return template.map((item) => (
      <Box
        key={item.id}
        height={200}
        width={340}
        display="flex"
        flexDirection="column"
        p={2}
        pb={1}
        mr={3}
        sx={{
          border: '1px solid lightgrey',
          borderRadius: '1px',
          cursor: 'pointer',
          boxShadow:
            selectedBox === item.id ? '0 0 20px rgba(0, 0, 0, 0.3)' : 'none',
        }}
        onClick={() => handleBoxClick(item.id)}
      >
        <Typography
          color={'basicButton.main'}
          variant="sm"
          sx={{ fontWeight: 500 }}
        >
          {item.title}
        </Typography>
        <Typography variant="lg" mt={1} sx={{ fontWeight: 600 }}>
          {item.desc}
        </Typography>
        <Stack ml={1}>
          <List>
            {item.in.map((inItem, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 5 }} />
                </ListItemIcon>
                <Typography color={'text.secondary'} ml={1}>
                  {inItem}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ marginTop: 'auto' }}>
          {item.chip.map((chip, idx) => (
            <Chip key={idx} label={chip} size="small" />
          ))}
        </Stack>
      </Box>
    ));
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stepper sx={{ width: '25%' }} activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button color="greyButton" sx={{ width: '100px' }} variant="contained">
          NEXT
        </Button>
      </Stack>
      <Stack ml={5} direction="row">
        {renderTemplate(template1)}
      </Stack>
      <Stack direction="row">{renderTemplate(template2)}</Stack>
      <Stack direction="row">{renderTemplate(template3)}</Stack>
    </Stack>
  );
};

export default CreateWbsTemplatePage;
