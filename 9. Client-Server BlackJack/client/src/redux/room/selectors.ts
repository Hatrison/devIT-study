import { RootState } from 'redux/store';

export const selectRoomToken = (state: RootState) => state.room.roomToken;

export const selectUserToken = (state: RootState) => state.room.userToken;

export const selectPlayers = (state: RootState) => state.room.players;

export const selectDealer = (state: RootState) => state.room.dealer;

export const selectId = (state: RootState) => state.room.id;

export const selectTurnId = (state: RootState) => state.room.turnId;
