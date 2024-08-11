import { useState, useEffect } from 'react';
import { Button, Stack, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData } from '@/store/wbsSlice';
import StepperComponent from '@/pages/wbs/components/stepperComponent';
import WbsInputTable from '@/pages/wbs/components/wbsInputTable';
import { PATHS } from '@/routes/paths';

const members = [
  '김영호',
  '박미영',
  '한민규',
  '이세진',
  '임동현',
  '백예나',
  '박지민',
  '이영현',
];

const WbsInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.wbs.tableData);
  const [localTableData, setLocalTableData] = useState([]);

  useEffect(() => {
    const modifiedData = tableData.map((row) => [...row]);
    setLocalTableData(modifiedData);
  }, [tableData]);

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    setLocalTableData((prevData) => {
      const updatedTable = [...prevData];
      updatedTable[rowIndex] = [...updatedTable[rowIndex]];
      updatedTable[rowIndex][cellIndex] = {
        ...updatedTable[rowIndex][cellIndex],
        value: newValue,
      };

      return updatedTable;
    });
  };

  const handleSave = () => {
    dispatch(setTableData(localTableData));
  };

  const handleBack = () => {
    handleSave();
    navigate(PATHS.wbs.basicinfo);
  };

  const handleNext = () => {
    handleSave();
    navigate(PATHS.wbs.wbsView);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
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
              color="basicButton"
              sx={{ width: '100px' }}
              onClick={handleNext}
            >
              SAVE
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Stack mt={3}>
          <WbsInputTable
            tableData={localTableData}
            handleCellChange={handleCellChange}
            members={members}
            width={70}
          />
        </Stack>
      </Container>
    </>
  );
};

export default WbsInput;
