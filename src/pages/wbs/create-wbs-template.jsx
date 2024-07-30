/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Stack, Container } from '@mui/material';
import { template1, template2, template3 } from './components/constants';
import { useState } from 'react';
import TemplateBox from '@/pages/wbs/components/templateBox';
import StepperComponent from '@/pages/wbs/components/stepperComponent';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

// ----------------------------------------------------------------------

const CreateWbsTemplatePage = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (id) => {
    setSelectedBox(id === selectedBox ? null : id);
  };

  const navigate = useNavigate();

  const handleCreateWbs = () => {
    navigate(PATHS.wbs.basicinfo);
  };

  const renderTemplate = (template) => {
    return template.map((item) => (
      <TemplateBox
        key={item.id}
        item={item}
        selectedBox={selectedBox}
        handleBoxClick={handleBoxClick}
      />
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ p: '24px' }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <StepperComponent activeStep={0} />
          <Button
            color="greyButton"
            sx={{ width: '100px' }}
            variant="contained"
            onClick={handleCreateWbs}
          >
            NEXT
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          {renderTemplate(template1)}
        </Stack>
        <Stack direction="row" spacing={2}>
          {renderTemplate(template2)}
        </Stack>
        <Stack direction="row" spacing={2}>
          {renderTemplate(template3)}
        </Stack>
      </Stack>
    </Container>
  );
};

export default CreateWbsTemplatePage;
