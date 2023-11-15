export type TCard = {
  suit: string;
  rank: string;
  value: number;
};

export type TPlayer = {
  hand: TCard[];
  id: number;
};

export type TState = {
  roomToken: string | null;
  userToken: string | null;
  players: TPlayer[];
  dealerCards: TCard[];
};
