import React, { ReactNode } from 'react';
import { PlayerButtons, PlayerWrapper } from './Player.styled';
import { CardTable } from '../CardTable/CardTable';
import { useCallback } from 'react';
import { Button } from '../Button/Button';
import { TCard } from '../../redux/room/room.types';
import { Card } from '../Card/Card';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { makeAction } from '../../redux/room/operations';

type props = {
  name: string;
  cards: TCard[];
  score: number;
  isActive: boolean;
};

/**
 * Player component for the card game.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the player.
 * @param {TCard[]} props.cards - The game deck.
 * @param {number} props.score - The player's score.
 * @param {boolean} props.isActive - Indicates whether the player is active.
 * @returns {ReactNode} The Player component.
 */
export const Player = ({
  name,
  cards = [],
  score = 0,
  isActive,
}: props): ReactNode => {
  const dispatch = useAppDispatch();

  /**
   * Callback function for the "hit" action to deal an additional card to the player.
   */
  const hit = useCallback(() => {
    dispatch(makeAction('hit'));
  }, []);

  /**
   * Callback function for the "stand" action to end the player's turn.
   */
  const stand = useCallback(() => {
    dispatch(makeAction('stand'));
  }, []);

  return name === 'Dealer' ? (
    <CardTable
      name={name}
      score={score}
      cards={cards.map(card => (
        <Card rank={card.rank} suit={card.suit} key={card.rank + card.suit} />
      ))}
    />
  ) : (
    <PlayerWrapper>
      <CardTable
        name={name}
        score={score}
        cards={cards.map(card => (
          <Card rank={card.rank} suit={card.suit} key={card.rank + card.suit} />
        ))}
      />
      <PlayerButtons>
        <li>
          <Button disabled={!isActive} text={'Hit'} onClick={() => hit()} />
        </li>
        <li>
          <Button disabled={!isActive} text={'Stand'} onClick={() => stand()} />
        </li>
      </PlayerButtons>
    </PlayerWrapper>
  );
};
