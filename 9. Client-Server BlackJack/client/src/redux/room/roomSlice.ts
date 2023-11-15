import { createSlice } from '@reduxjs/toolkit';
import { createRoom, exitRoom, joinRoom } from './operations';
import { TState } from './room.types';

const initialState: TState = {
  roomToken: null,
  userToken: null,
  players: [],
  dealerCards: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    cleanRoom: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createRoom.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(exitRoom.fulfilled, (state, action) => {
        return { ...initialState };
      });
  },
});

export const { cleanRoom } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
