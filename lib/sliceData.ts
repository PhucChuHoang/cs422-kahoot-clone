import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  currentQuestions: Question[];
  currentQuestionDisplay?: Question;
  currentQuizName?: string;
  currentPlayerList?: string[];
  listSession?: QuizSession[];
  isUpdate: boolean;
  currentQuizId?: string;
  pageKey?: string;
}

const initialState: DataState = {
  currentQuestions: [],
  currentQuestionDisplay: undefined,
  currentQuizName: undefined,
  listSession: undefined,
  isUpdate: false,
  currentQuizId: undefined,
  currentPlayerList: [],
  pageKey: undefined,
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
    setCurrentPlayerList(state, action: PayloadAction<string[]>) {
      state.currentPlayerList = action.payload;
    },
    setPageKey(state, action: PayloadAction<string>) {
      state.pageKey = action.payload;
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
  setCurrentPlayerList,
  setPageKey,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
