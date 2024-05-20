import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentHost: string;
  currentQuestions: Question[];
  currentQuestion: Question | null;
  totalQuestions: number;
  hasAnswer?: boolean;
}

const initialState: GameState = {
  currentHost: '',
  currentQuestions: [],
  currentQuestion: null,
  totalQuestions: 0,
  hasAnswer: false,
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
    setHasAnswer(state, action: PayloadAction<boolean>) {
      state.hasAnswer = action.payload;
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
  setHasAnswer,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
