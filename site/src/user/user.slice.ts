import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultAppState, UserData } from '../config';

let slice = createSlice({
  initialState: defaultAppState.user,
  name: 'user',
  reducers: {
    getUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.status = 'SUCCESS';
      state.error = undefined;
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'ERROR';
    },
  },
});

export const userReducers = slice.reducer;
export const userActions = slice.actions;
