import { RootState } from 'redux/store';

export const selectRoomToken = (state: RootState) => state.room.roomToken;
