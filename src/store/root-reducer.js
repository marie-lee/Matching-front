import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@/store/auth-slice';
import nameReducer from '@/store/name-reducer';

const rootReducer = combineReducers({
  auth: authSlice,
  name: nameReducer,
});

export default rootReducer;
