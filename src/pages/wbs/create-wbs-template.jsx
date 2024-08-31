/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Stack, Container } from '@mui/material';
import { template1, template2, template3 } from './components/constants';
import { useState } from 'react';
import TemplateBox from '@/pages/wbs/components/template-box';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

// ----------------------------------------------------------------------

const CreateWbsTemplatePage = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const location = useLocation();
  const { pjtSn } = location.state || {};

  const handleBoxClick = (id) => {
    setSelectedBox(id === selectedBox ? null : id);
  };

  const navigate = useNavigate();

  const handleCreateWbs = () => {
    navigate(PATHS.wbs.basicinfo, { state: { pjtSn } });
  };
  const handleBack = () => {
    navigate(PATHS.wbs.root);
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
    <Container maxWidth="lg" sx={{ p: '30px' }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <StepperComponent activeStep={0} />

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
              onClick={handleCreateWbs}
            >
              NEXT
            </Button>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3}>
          {renderTemplate(template1)}
        </Stack>
        <Stack direction="row" spacing={3}>
          {renderTemplate(template2)}
        </Stack>
        <Stack direction="row" spacing={3}>
          {renderTemplate(template3)}
        </Stack>
      </Stack>
    </Container>
  );
};

export default CreateWbsTemplatePage;
