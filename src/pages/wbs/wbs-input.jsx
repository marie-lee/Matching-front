import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Container, Grid, Box } from '@mui/material';
import { setTableData } from '@/store/wbsSlice';
import { PATHS } from '@/routes/paths';
import { selectPjtSn } from '@/store/pjtsn-reducer';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';

import GanttInputFull from '@/pages/wbs/components/gant-input-full';
import WbsFull from './components/wbs-full';
//Api Import
import { postWbs } from '@/services/wbs';

const WbsInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.wbs.tableData);
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const datas = useSelector((state) => state.wbs.memberData);

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

  const addRow = (rowIndex) => {
    const updatedTable = [...localTableData.map((row) => [...row])];

    let partRowSpan = updatedTable[rowIndex][0]?.rowSpan || 1;
    let divisionRowSpan = updatedTable[rowIndex][1]?.rowSpan || 1;

    const newRow = Array(updatedTable[0].length).fill({
      value: '',
      rowSpan: 1,
    });

    // Part, Division의 rowSpan 업데이트
    updatedTable[rowIndex][0].rowSpan = partRowSpan + 1;
    updatedTable[rowIndex][1].rowSpan = divisionRowSpan + 1;

    const insertPosition = rowIndex + divisionRowSpan;

    // 새 행 추가 후 Part와 Division이 병합된 경우 null 처리
    updatedTable.splice(insertPosition, 0, newRow);
    updatedTable[insertPosition][0] = null;
    updatedTable[insertPosition][1] = null;

    setLocalTableData(updatedTable);
  };

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
      await postWbs(pjtSn, finalData);
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
                    addRow={addRow}
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
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WbsInput;
