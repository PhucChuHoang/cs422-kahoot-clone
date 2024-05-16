import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './sliceData';

export const rootReducer = combineReducers({
  data: dataReducer,
});
