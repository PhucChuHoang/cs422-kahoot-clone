import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  currentQuestions: Question[];
  currentQuestionDisplay?: Question;
  currentQuizName?: string;
  listSession?: QuizSession[];
  isUpdate: boolean;
  currentQuizId?: string;
}

const initialState: DataState = {
  currentQuestions: [],
  currentQuestionDisplay: undefined,
  currentQuizName: undefined,
  listSession: undefined,
  isUpdate: false,
  currentQuizId: undefined,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.currentQuestions = action.payload;
    },
    addQuestion(state, action: PayloadAction<Question>) {
      state.currentQuestions.push(action.payload);
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.currentQuestions = state.currentQuestions.filter(
        (_, index) => index !== action.payload,
      );
    },
    setCurrentQuestionDisplay(state, action: PayloadAction<number>) {
      if (action.payload === -1) {
        state.currentQuestionDisplay = undefined;
        return;
      }
      state.currentQuestionDisplay = state.currentQuestions[action.payload];
    },
    setListSession(state, action: PayloadAction<QuizSession[] | undefined>) {
      state.listSession = action.payload;
    },
    setCurrentQuizName(state, action: PayloadAction<string>) {
      state.currentQuizName = action.payload;
    },
    removeQuizSession(state, action: PayloadAction<number>) {
      state.listSession = state.listSession?.filter(
        (_, index) => index !== action.payload,
      );
    },
    setIsUpdate(state, action: PayloadAction<boolean>) {
      state.isUpdate = action.payload;
    },
    setCurrentQuizId(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  removeQuestion,
  setCurrentQuestionDisplay,
  setListSession,
  setCurrentQuizName,
  removeQuizSession,
  setIsUpdate,
  setCurrentQuizId,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
