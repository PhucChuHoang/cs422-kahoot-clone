import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  currentQuizzes: Quiz[];
  currentQuizDisplay?: Quiz;
  isLogin: boolean;
  listSession: QuizSession[];
}

const initialState: DataState = {
  currentQuizzes: [],
  currentQuizDisplay: undefined,
  isLogin: false,
  listSession: [
    {
      id: '1',
      name: 'Test Quiz',
      creator_id: '1',
      list_quizzes: [
        {
          question: 'What is the name of the capital city of Indonesia?',
          answers: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
        },
        {
          question: 'What is the name of the capital city of Japan?',
          answers: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido'],
        },
        {
          question: 'What is the name of the capital city of South Korea?',
          answers: ['Seoul', 'Busan', 'Incheon', 'Jeju'],
        },
      ],
    },
    {
      id: '2',
      name: 'Test Quiz 2',
      creator_id: '1',
      list_quizzes: [
        {
          question: 'What is the name of the capital city of Japan?',
          answers: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
        },
        {
          question: 'What is the name of the capital city of sadkasl;kda;skld?',
          answers: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido'],
        },
        {
          question:
            'What is the name of the capital city of as,dmja.sdlasjkdjas?',
          answers: ['Seoul', 'Busan', 'Incheon', 'Jeju'],
        },
        {
          question: 'What is the name of the capital city of Japan?',
          answers: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
        },
        {
          question: 'What is the name of the capital city of sadkasl;kda;skld?',
          answers: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido'],
        },
        {
          question:
            'What is the name of the capital city of as,dmja.sdlasjkdjas?',
          answers: ['Seoul', 'Busan', 'Incheon', 'Jeju'],
        },
        {
          question: 'What is the name of the capital city of Japan?',
          answers: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
        },
        {
          question: 'What is the name of the capital city of sadkasl;kda;skld?',
          answers: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido'],
        },
        {
          question:
            'What is the name of the capital city of as,dmja.sdlasjkdjas?',
          answers: ['Seoul', 'Busan', 'Incheon', 'Jeju'],
        },
        {
          question: 'What is the name of the capital city of Japan?',
          answers: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'],
        },
        {
          question: 'What is the name of the capital city of sadkasl;kda;skld?',
          answers: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido'],
        },
        {
          question:
            'What is the name of the capital city of as,dmja.sdlasjkdjas?',
          answers: ['Seoul', 'Busan', 'Incheon', 'Jeju'],
        },
      ],
    },
  ],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Quiz[]>) {
      state.currentQuizzes = action.payload;
    },
    addQuestion(state, action: PayloadAction<Quiz>) {
      state.currentQuizzes.unshift(action.payload);
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
    setListSession(state, action: PayloadAction<QuizSession[]>) {
      state.listSession = action.payload;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  removeQuiz,
  setCurrentQuizDisplay,
  setLogin,
  setListSession,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
