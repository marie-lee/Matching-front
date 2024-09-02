import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import WbsFull from '@/pages/wbs/components/wbs-full';
import GanttFull from '@/pages/wbs/components/gantt-full';
import { setTableData } from '@/store/wbsSlice';

import { selectPjtSn } from '@/store/pjtsn-reducer';

const WbsInputTable = ({
  localTableData,
  setLocalTableData,
  handleCellChange,
  isFullWidth,
  editable,
  members,
  projectStartDate,
  projectEndDate,
}) => {
  console.log('localTableData', localTableData);
  useEffect(() => {
    if (localTableData && localTableData.length > 0) {
      const modifiedData = projectEndDate.map((row) => [...row]);
      setLocalTableData(modifiedData);
    }
  }, [localTableData]);

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
          members={members}
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
            projectStartDate={projectStartDate}
            projectEndDate={projectEndDate}
          />
        </Box>
      )}
    </Box>
  );
};

export default WbsInputTable;
