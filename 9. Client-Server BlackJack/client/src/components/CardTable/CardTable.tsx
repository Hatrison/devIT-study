import React from 'react';
import { Cards, CardTableWrapper, Info, Points } from './CardTable.styled';
import { ReactNode } from 'react';

type props = {
  name: string;
  score: number;
  cards: ReactNode[];
};

/**
 * CardTable component for displaying player or dealer information and cards.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the player or dealer.
 * @param {number} props.score - The score of the player or dealer.
 * @param {ReactNode[]} props.cards - The React nodes representing the cards.
 * @returns {ReactNode} The CardTable component.
 */
export const CardTable = ({ name, score, cards }: props): ReactNode => {
  return (
    <CardTableWrapper>
      <Info>
        <h2>{name}</h2>
        <Points className="score">{score}</Points>
      </Info>
      <Cards>{cards}</Cards>
    </CardTableWrapper>
  );
};
