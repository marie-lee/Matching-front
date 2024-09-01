import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import WbsFull from '@/pages/wbs/components/wbs-full';
import GanttFull from '@/pages/wbs/components/gantt-full';
import { setTableData } from '@/store/wbsSlice';

import { selectPjtSn } from '@/store/pjtsn-reducer';

const WbsInputTable = ({ isFullWidth, editable }) => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.wbs.tableData);
  const pjtData = useSelector((state) => state.wbs.pjtData);
  const memberDatas = useSelector((state) => state.wbs.memberData);

  const [localTableData, setLocalTableData] = useState([]);

  const memberNames = memberDatas.map((member) => member.userNm);
  const ProjectStartDate = new Date(pjtData.startDt);
  const ProjectEndDate = new Date(pjtData.endDt);

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      const modifiedData = tableData.map((row) => [...row]);
      setLocalTableData(modifiedData);
    }
  }, [tableData]);

  const handleCellChange = (rowIndex, cellIndex, newValue) => {
    if (editable) return;

    const updatedTable = [...localTableData];
    updatedTable[rowIndex] = [...updatedTable[rowIndex]];
    updatedTable[rowIndex][cellIndex] = {
      ...updatedTable[rowIndex][cellIndex],
      value: newValue,
    };

    setLocalTableData(updatedTable);

    dispatch(setTableData(updatedTable));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: isFullWidth === 100 ? 10 : 6,
        }}
      >
        <WbsFull
          tableData={localTableData}
          handleCellChange={handleCellChange}
          members={memberNames}
          editable={editable}
        />
      </Box>
      {isFullWidth !== 100 && (
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
        </Box>
      )}
    </Box>
  );
};

export default WbsInputTable;
