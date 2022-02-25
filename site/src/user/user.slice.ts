import { createSlice } from '@reduxjs/toolkit';
import { defaultAppState } from '../config';

let slice = createSlice({
  initialState: defaultAppState.user,
  name: 'user',
  reducers: {
    getUser: (state, action) => {
      state.data = action.payload;
      state.status = 'SUCCESS';
      state.error = undefined;
    },
    getUserFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'ERROR';
    },
  },
});

export const userReducers = slice.reducer;
export const userActions = slice.actions;
