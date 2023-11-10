import React, { ReactNode } from 'react';
import { Back, CardWrapper, Front, Rank, Suit } from './Card.styled';

type props = {
  rank: string;
  suit: string;
};

/**
 * Card component for displaying a playing card.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.rank - The rank of the card (e.g., 'A', '2', '3', ... 'K').
 * @param {string} props.suit - The suit of the card (e.g., '♥', '♦', '♣', '♠').
 * @returns {ReactNode} The Card component.
 */
export const Card = ({ rank, suit }: props): ReactNode => {
  return (
    <CardWrapper color={suit === '♥' || suit === '♦' ? 'red' : 'black'}>
      <Front>
        <Rank>{rank}</Rank>
        <Suit>{suit}</Suit>
      </Front>
      <Back />
    </CardWrapper>
  );
};
