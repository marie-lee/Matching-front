import { useState, useEffect } from 'react';
import { Button, Stack, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData } from '@/store/wbsSlice';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import GanttChart from '@/pages/wbs/components/gantt-chart';
import { PATHS } from '@/routes/paths';

const WbsInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.wbs.tableData);
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const memberDatas = useSelector((state) => state.wbs.memberData);

  const memberData = memberDatas.map((member, index) => ({
    userSn: index + 1,
    userNm: member.name || '',
    part: member.role || '',
    role: member.permission || '',
  }));

  const [localTableData, setLocalTableData] = useState([]);
  const memberNames = memberDatas.map((member) => member.name);
  const ProjectStartDate = new Date(pjtData.startDt);
  const ProjectEndDate = new Date(pjtData.endDt);
  // 따로 컴포넌트화 하는 작업 필수 !
  function mergeTableDataByRowSpan(tableData) {
    const result = [];
    let i = 0;

    while (i < tableData.length) {
      const currentRow = tableData[i];
      const firstValue = currentRow[0]?.value || '';

      const primaryGroup = {
        name: firstValue,
        child: [],
      };

      let j = 0;
      while (j < (currentRow[0]?.rowSpan || 1)) {
        const subRow = tableData[i + j];
        const secondValue = subRow[1]?.value || '';

        const secondaryGroup = {
          name: secondValue,
          child: [],
        };

        let k = 0;
        while (k < (subRow[1]?.rowSpan || 1)) {
          const innerRow = tableData[i + j + k];
          const thirdValue = innerRow[2]?.value || '';

          const tertiaryGroup = {
            name: thirdValue,
            data: {
              worker: innerRow[3]?.value || '',
              startDt: innerRow[4]?.value || '',
              endDt: innerRow[5]?.value || '',
              status: innerRow[6]?.value || '',
            },
          };

          secondaryGroup.child.push(tertiaryGroup);
          k += innerRow[2]?.rowSpan || 1;
        }

        primaryGroup.child.push(secondaryGroup);
        j += subRow[1]?.rowSpan || 1;
      }

      result.push(primaryGroup);
      i += currentRow[0]?.rowSpan || 1;
    }

    return result;
  }

  const wbsData = mergeTableDataByRowSpan(tableData);

  const finalData = {
    pjtData,
    memberData,
    wbsData,
  };
  console.log('Final Data:', JSON.stringify(finalData, null, 2));

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
