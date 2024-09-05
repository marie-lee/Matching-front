import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@/store/auth-slice';
import nameReducer from '@/store/name-reducer';
import wbsReducer from '@/store/wbsSlice';
import pjtsnReducer from '@/store/pjtsn-reducer';

const rootReducer = combineReducers({
  auth: authSlice,
  name: nameReducer,
  wbs: wbsReducer,
  pjtSn: pjtsnReducer,
});

export default rootReducer;
