export type TCard = {
  suit: string;
  rank: string;
  value: number;
};

export type TPlayer = {
  hand: TCard[];
  id: number;
  score: number;
};

export type TDealer = {
  hand: TCard[];
  score: number;
};

export type TState = {
  roomToken: string | null;
  userToken: string | null;
  players: TPlayer[];
  dealer: TDealer;
  id: number;
  turnId: number;
  isGameOver: boolean;
  winningMessage: string;
};
