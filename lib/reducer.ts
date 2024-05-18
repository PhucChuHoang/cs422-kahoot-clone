import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './sliceData';
import { userReducer } from './sliceUser';

export const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
});
