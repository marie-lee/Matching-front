import { createSlice } from '@reduxjs/toolkit';
import { createMergedTable } from '@/pages/wbs/components/wbs-table';
import { wbsData } from '@/pages/wbs/components/constants';

const initialState = {
  pjtData: {
    startDt: '',
    endDt: '',
  },
  memberData: [],
  tableData: createMergedTable(wbsData).map((row) => [
    ...row,
    { value: '', rowSpan: 1 },
    { value: '', rowSpan: 1 },
    { value: '', rowSpan: 1 },
    { value: '대기', rowSpan: 1 },
  ]),
  participants: [],
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
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    setPjtData: (state, action) => {
      state.pjtData = action.payload;
    },
    setMemberData: (state, action) => {
      state.memberData = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const {
  updateCell,
  setTableData,
  setParticipants,
  setPjtData,
  setMemberData,
  resetState,
} = wbsSlice.actions;

export default wbsSlice.reducer;
