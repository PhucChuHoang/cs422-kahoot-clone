import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataState = {
  currentQuizzes: Quiz[];
};

const DataSlice = createSlice({
  name: 'data',
  initialState: {
    currentQuizzes: [] as Quiz[],
  } satisfies DataState,
  reducers: {
    setQuiz(state, action: PayloadAction<Quiz[]>) {
      state.currentQuizzes.push(...action.payload);
    },
  },
});

export const { setQuiz } = DataSlice.actions;
export const dataReducer = DataSlice.reducer;
