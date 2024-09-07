/* eslint-disable no-unused-vars */
//React Import
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Mui Import
import { Button, Stack, Container, Grid, Box } from '@mui/material';

//Data Import
import { setTableData } from '@/store/wbsSlice';
import { PATHS } from '@/routes/paths';
import { selectPjtSn } from '@/store/pjtsn-reducer';

//Components Import
import StepperComponent from '@/pages/wbs/components/stepper-component';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';
import WbsFull from '@/pages/wbs/components/wbs-full';
import GanttInputFull from '@/pages/wbs/components/gant-input-full';

//Api Import
import { postWbs } from '@/services/wbs';

const WbsInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.wbs.tableData);
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const datas = useSelector((state) => state.wbs.data);
  const pjtSn = useSelector(selectPjtSn);

  const memberNames = datas.map((member) => member.userNm);

  const ProjectStartDate = new Date(pjtData.startDt);
  const ProjectEndDate = new Date(pjtData.endDt);

  const [localTableData, setLocalTableData] = useState([]);

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setLocalTableData(tableData);
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

    const wbsData = mergeTableDataByRowSpan(localTableData, datas);

    const finalData = {
      pjtData,
      memberData: datas,
      wbsData,
    };

    console.log('Final Data:', JSON.stringify(finalData, null, 2));
    try {
      const postCreateWbs = await postWbs(pjtSn, finalData);
      navigate(PATHS.task.root);
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
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 6 }}>
                  <WbsFull
                    tableData={localTableData}
                    handleCellChange={handleCellChange}
                    members={memberNames}
                    editable={false}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowX: 'auto',
                    flex: 3,
                  }}
                >
                  <GanttInputFull
                    tableData={localTableData}
                    projectStartDate={ProjectStartDate}
                    projectEndDate={ProjectEndDate}
                  />
                  ;
                </Box>
              </Box>
              ;
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WbsInput;
