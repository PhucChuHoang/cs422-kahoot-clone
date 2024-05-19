import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentHost: string;
  currentQuestions: Question[];
  currentQuestion: Question | null;
  totalQuestions: number;
}

const initialState: GameState = {
  currentHost: '',
  currentQuestions: [],
  currentQuestion: null,
  totalQuestions: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setHost(state, action: PayloadAction<string>) {
      state.currentHost = action.payload;
    },
    setGameQuestions(state, action: PayloadAction<Question[]>) {
      state.currentQuestions = action.payload;
    },
    setTotalQuestions(state, action: PayloadAction<number>) {
      state.totalQuestions = action.payload;
    },
    setGameQuestion(state, action: PayloadAction<Question>) {
      state.currentQuestion = action.payload;
    },
    addGameQuestion(state, action: PayloadAction<Question>) {
      state.currentQuestions.push(action.payload);
    },
    removeGameQuestion(state, action: PayloadAction<number>) {
      state.currentQuestions = state.currentQuestions.filter(
        (_, index) => index !== action.payload,
      );
    },
  },
});

export const {
  setGameQuestions,
  setGameQuestion,
  addGameQuestion,
  removeGameQuestion,
  setHost,
  setTotalQuestions,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
