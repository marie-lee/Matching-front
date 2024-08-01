import React, { useState } from 'react';
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
import WbsTable, { createMergedTable } from '@/pages/wbs/components/wbsTable';
import { wbsData } from '@/pages/wbs/components/constants';

const BasicInfo = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(createMergedTable(wbsData));

  const handleInputWbs = () => {
    navigate(PATHS.wbs.wbsInput);
  };

  const handleBack = () => {
    navigate(PATHS.wbs.createWbs);
  };

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    const updatedTable = [...tableData];
    const cell = updatedTable[rowIndex][cellIndex];
    if (cell) {
      cell.value = newValue;
      setTableData(updatedTable);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: 3, pb: 10 }}>
      <Stack spacing={10}>
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
        <ProjectInfo />
        <Stack>
          <Stack direction="row" alignItems="center" mb={5}>
            <Typography variant="h6" mr={6} fontWeight="fontWeightSemiBold">
              <li>템플릿 Depth 정보</li>
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
          <WbsTable
            tableData={tableData}
            handleCellChange={handleCellChange}
            borderStyle="1px solid rgba(0, 0, 0, 0.4)"
          />
        </Stack>

        <UserAdd />
      </Stack>
    </Container>
  );
};

export default BasicInfo;
