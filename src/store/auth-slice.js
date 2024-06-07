import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  isSignIn: false,
  token: null,
};

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isSignIn', 'token'],
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      const { token } = action.payload;
      state.isSignIn = true;
      state.token = token;
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.token = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
