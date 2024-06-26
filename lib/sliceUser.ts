import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username?: string;
  token?: string;
  isLogin: boolean;
}

const initialState: UserState = {
  username: undefined,
  token: undefined,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string | undefined>) {
      state.username = action.payload;
    },
    setToken(state, action: PayloadAction<string | undefined>) {
      state.token = action.payload;
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const { setUsername, setToken, setLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;
