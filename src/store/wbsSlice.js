import { createSlice } from '@reduxjs/toolkit';
import { createMergedTable } from '@/pages/wbs/components/wbsTable';
import { wbsData } from '@/pages/wbs/components/constants';

const initialState = {
  tableData: createMergedTable(wbsData).map((row) => [
    ...row,
    { value: '', rowSpan: 1 }, // Engineer
    { value: '', rowSpan: 1 }, // Start Date
    { value: '', rowSpan: 1 }, // Due Date
    { value: '', rowSpan: 1 }, // Status
  ]),
};

const wbsSlice = createSlice({
  name: 'wbs',
  initialState,
  reducers: {
    updateCell: (state, action) => {
      const { rowIndex, cellIndex, newValue } = action.payload;
      if (state.tableData[rowIndex] && state.tableData[rowIndex][cellIndex]) {
        state.tableData[rowIndex][cellIndex].value = newValue;
      }
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const { updateCell, setTableData } = wbsSlice.actions;

export default wbsSlice.reducer;
