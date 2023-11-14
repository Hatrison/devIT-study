import { createSlice } from '@reduxjs/toolkit';
import { createRoom } from './operations';

const initialState = {
  roomToken: null,
  userToken: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    cleanRoomData(state) {
      state.roomToken = null;
      state.userToken = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.roomToken = action.payload.roomToken;
      state.userToken = action.payload.userToken;
    });
  },
});

export const { cleanRoomData } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
