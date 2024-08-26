import { useState, useEffect } from 'react';
import { Button, Stack, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData } from '@/store/wbsSlice';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import GanttChart from '@/pages/wbs/components/gantt-chart';
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

  // Project Start and End Dates for Gantt Chart
  const ProjectStartDate = new Date('2024-01-01');
  const ProjectEndDate = new Date('2024-10-31');

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      const modifiedData = tableData.map((row) => [...row]);
      setLocalTableData(modifiedData);
    }
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
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <StepperComponent activeStep={2} />
          <Stack direction="row" spacing={1}>
            <Button color="greyButton" sx={{ width: '100px' }} onClick={handleBack}>
              BACK
            </Button>
            <Button color="basicButton" sx={{ width: '100px' }} onClick={handleNext}>
              SAVE
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* GanttChart 컴포넌트 렌더링 */}
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ overflowX: 'auto', maxHeight: '100%' }}>
              <GanttChart
                tableData={localTableData}
                handleCellChange={handleCellChange}
                members={members}
                width={100}
                editable={false}
                projectStartDate={ProjectStartDate}
                projectEndDate={ProjectEndDate}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WbsInput;
