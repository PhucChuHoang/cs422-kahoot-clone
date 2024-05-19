import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentHost: string;
  currentQuestions: Question[];
  currentQuestion: Question | null;
}

const initialState: GameState = {
  currentHost: '',
  currentQuestions: [],
  currentQuestion: null,
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
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
