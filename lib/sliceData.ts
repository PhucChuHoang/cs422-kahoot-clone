import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  currentQuizzes: Quiz[];
  currentQuizDisplay?: Quiz;
  isLogin: boolean;
}

const initialState: DataState = {
  currentQuizzes: [],
  currentQuizDisplay: undefined,
  isLogin: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQuiz(state, action: PayloadAction<Quiz[]>) {
      state.currentQuizzes = [...state.currentQuizzes, ...action.payload];
    },
    removeQuiz(state, action: PayloadAction<number>) {
      state.currentQuizzes = state.currentQuizzes.filter(
        (_, index) => index !== action.payload,
      );
    },
    setCurrentQuizDisplay(state, action: PayloadAction<number>) {
      if (action.payload === -1) {
        state.currentQuizDisplay = undefined;
        return;
      }
      state.currentQuizDisplay = state.currentQuizzes[action.payload];
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const { setQuiz, removeQuiz, setCurrentQuizDisplay, setLogin } =
  dataSlice.actions;
export const dataReducer = dataSlice.reducer;
