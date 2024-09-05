// pjtSn-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pjtSn: null,
};

const pjtSnSlice = createSlice({
  name: 'pjtSn',
  initialState,
  reducers: {
    setPjtSn(state, action) {
      state.pjtSn = action.payload;
    },
    clearPjtSn(state) {
      state.pjtSn = null;
    },
  },
});

export const { setPjtSn, clearPjtSn } = pjtSnSlice.actions;
export const selectPjtSn = (state) => state.pjtSn.pjtSn;
export default pjtSnSlice.reducer;
