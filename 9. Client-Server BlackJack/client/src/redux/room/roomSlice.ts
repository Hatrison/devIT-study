import { createSlice } from '@reduxjs/toolkit';
import { createRoom, exitRoom, joinRoom, makeAction } from './operations';
import { TState } from './room.types';

const initialState: TState = {
  roomToken: null,
  userToken: null,
  players: [],
  dealer: {
    hand: [],
    score: 0,
  },
  id: 0,
  turnId: 0,
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
      })
      .addCase(makeAction.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const { cleanRoom } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
