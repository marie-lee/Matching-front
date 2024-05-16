import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  isLogined: false,
  token: '',
};

const persistConfig = {
  key: 'auth',
  storage,
  whiteList: ['isLogined', 'token'],
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.isLogined = true;
      state.token = token;
    },
  }
});

export const { login } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
