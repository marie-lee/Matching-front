import { useState, useEffect } from 'react';
import { Button, Stack, Container, Grid, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData, resetState } from '@/store/wbsSlice';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import GanttChart from '@/pages/wbs/components/gantt-chart';
import { PATHS } from '@/routes/paths';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';
import { postWbs } from '@/services/wbs';

const WbsInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const tableData = useSelector((state) => state.wbs.tableData);
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const memberDatas = useSelector((state) => state.wbs.memberData);

  const [localTableData, setLocalTableData] = useState([]);

  const { pjtSn } = location.state || {};
  const memberData = memberDatas.map((member, index) => ({
    userSn: index + 1,
    userNm: member.name || '',
    part: member.role || '',
    role: member.permission || '',
  }));
  const memberNames = memberDatas.map((member) => member.name);
  const ProjectStartDate = new Date(pjtData.startDt);
  const ProjectEndDate = new Date(pjtData.endDt);

  const wbsData = mergeTableDataByRowSpan(tableData, memberData);

  const finalData = {
    pjtData,
    memberData,
    wbsData,
  };

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

  const handleNext = async () => {
    handleSave();
    console.log('Final Data:', JSON.stringify(finalData, null, 2));
    try {
      const res = await postWbs(pjtSn, finalData);
      console.log('res : ', res);
      dispatch(resetState());
      window.location.href = '/task';
    } catch (error) {
      console.error('Error posting WBS Data:', error);
    }
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ overflowX: 'auto', maxHeight: '100%' }}>
              <GanttChart
                tableData={localTableData}
                handleCellChange={handleCellChange}
                members={memberNames}
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
