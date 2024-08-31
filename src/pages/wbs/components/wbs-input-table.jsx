import { useState, useEffect } from 'react';
import { Button, Stack, Container, Grid, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTableData, resetState } from '@/store/wbsSlice';
import StepperComponent from '@/pages/wbs/components/stepper-component';
import { PATHS } from '@/routes/paths';
import { mergeTableDataByRowSpan } from '@/pages/wbs/components/merge-table-data';
import { postWbs } from '@/services/wbs';
import WbsFull from '@/pages/wbs/components/wbs-full';
import GanttFull from '@/pages/wbs/components/gantt-full';

const WbsInputTable = ({ isFullWidth }) => {
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

  return isFullWidth === 100 ?
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 10 }}>
          <WbsFull
            tableData={localTableData}
            handleCellChange={handleCellChange}
            members={memberNames}
            editable={false}
          />
        </Box>
      </Box>
    : <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
          <GanttFull
            tableData={localTableData}
            projectStartDate={ProjectStartDate}
            projectEndDate={ProjectEndDate}
          />
          ;
        </Box>
      </Box>;
};

export default WbsInputTable;
