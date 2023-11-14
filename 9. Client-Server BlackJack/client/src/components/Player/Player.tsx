import React, { ReactNode } from 'react';
import { PlayerButtons, PlayerWrapper } from './Player.styled';
import { CardTable } from '../CardTable/CardTable';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Deck, TCard } from '../../services/Deck';

type props = {
  name: string;
  deck: Deck;
  isActive: boolean;
  onPlayerEndTurn: () => void;
};

/**
 * Player component for the card game.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the player.
 * @param {Deck} props.deck - The game deck.
 * @param {boolean} props.isActive - Indicates whether the player is active.
 * @param {Function} props.onPlayerEndTurn - Callback function triggered at the end of the player's turn.
 * @returns {ReactNode} The Player component.
 */
export const Player = ({
  name,
  deck,
  isActive,
  onPlayerEndTurn,
}: props): ReactNode => {
  const [score, setScore] = useState<number>(0);
  const [cards, setCards] = useState<TCard[]>([]);

  /**
   * Effect to deal initial cards to the player after the first render.
   */
  useEffect(() => {
    setCards(deck.deal(2));
  }, [deck]);

  /**
   * Effect to calculate the player's score.
   */
  useEffect(() => {
    let { total, numAces } = cards.reduce(
      (acc, card) => {
        return {
          total: acc.total + card.value,
          numAces: acc.numAces + (card.rank === 'A' ? 1 : 0),
        };
      },
      { total: 0, numAces: 0 }
    );

    while (numAces > 0 && total > 21) {
      total -= 10;
      numAces--;
    }

    setScore(total);

    if (total > 21) {
      onPlayerEndTurn();
    }
  }, [cards]);

  /**
   * Callback function for the "hit" action to deal an additional card to the player.
   */
  const hit = useCallback(() => {
    setCards(cards => [...cards, ...deck.deal(1)]);
  }, []);

  /**
   * Callback function for the "stand" action to end the player's turn.
   */
  const stand = useCallback(() => {
    onPlayerEndTurn();
  }, [onPlayerEndTurn]);

  return name === 'Dealer' ? (
    <CardTable
      name={name}
      score={score}
      cards={cards.map(card => card.component)}
    />
  ) : (
    <PlayerWrapper>
      <CardTable
        name={name}
        score={score}
        cards={cards.map(card => card.component)}
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
