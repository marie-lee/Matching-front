// name-reducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
};

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setName } = nameSlice.actions;
export const selectName = (state) => state.name.name;
export default nameSlice.reducer;
