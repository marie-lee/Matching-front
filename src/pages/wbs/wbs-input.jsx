import React, { useState } from 'react';
import { Button, Stack, Container, TextField } from '@mui/material';
import StepperComponent from '@/pages/wbs/components/stepperComponent';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import WbsTable, { createMergedTable } from '@/pages/wbs/components/wbsTable';
import { wbsData } from '@/pages/wbs/components/constants';

const WbsInput = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(createMergedTable(wbsData));

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    const updatedTable = [...tableData];
    const cell = updatedTable[rowIndex][cellIndex];
    if (cell) {
      cell.value = newValue;
      setTableData(updatedTable);
    }
  };

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
      <Stack>
        <WbsTable
          tableData={tableData}
          handleCellChange={handleCellChange}
          borderStyle="1px solid rgba(0, 0, 0, 0.4)"
        />
      </Stack>
    </Container>
  );
};

export default WbsInput;
