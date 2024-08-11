import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@/store/auth-slice';
import nameReducer from '@/store/name-reducer';
import wbsReducer from '@/store/wbsSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  name: nameReducer,
  wbs: wbsReducer,
});

export default rootReducer;
