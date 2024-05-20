import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentHost: string;
  currentQuestions: Question[];
  currentQuestion: Question | null;
  totalQuestions: number;
  hasAnswer?: boolean;
  time?: number;
}

const initialState: GameState = {
  currentHost: '',
  currentQuestions: [],
  currentQuestion: null,
  totalQuestions: 0,
  hasAnswer: false,
  time: 30,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setHost(state, action: PayloadAction<string>) {
      state.currentHost = action.payload;
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
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
  setTime,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
