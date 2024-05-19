import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './sliceData';
import { userReducer } from './sliceUser';
import { gameReducer } from './sliceGame';

export const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  game: gameReducer,
});
