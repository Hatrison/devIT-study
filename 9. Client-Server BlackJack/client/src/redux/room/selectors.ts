import { RootState } from 'redux/store';

export const selectRoomToken = (state: RootState) => state.room.roomToken;

export const selectUserToken = (state: RootState) => state.room.userToken;

export const selectPlayers = (state: RootState) => state.room.players;

export const selectDealerCards = (state: RootState) => state.room.dealerCards;
