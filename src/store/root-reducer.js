import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@/store/auth-slice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;
