import React, { ReactNode, useCallback } from 'react';
import { Content, Main, Playground } from './App.styled';
import { Header } from './Header/Header';
import { Player } from './Player/Player';
import { Modal } from './Modal/Modal';
import { useEffect, useState } from 'react';
import { Deck } from '../services/Deck';

type props = {
  playersNum: number;
};

/**
 * App component for the card game.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.playersNum - The number of players in the game.
 * @returns {ReactNode} The App component.
 */
export const App = ({ playersNum }: props): ReactNode => {
  const [deck, setDeck] = useState<Deck>(new Deck());
  const [players] = useState<number[]>(
    Array.from({ length: playersNum }, (_, index) => index + 1)
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  /**
   * Effect to set the active player to the initial state when a new game starts.
   */
  useEffect(() => {
    setActivePlayer(1);
  }, [deck]);

  /**
   * Function to toggle the game over modal.
   */
  const toggleModal = () => {
    setIsGameOver(!isGameOver);
  };

  /**
   * Function to handle the end of a player's turn.
   */
  const handlePlayerEndTurn = () => {
    if (activePlayer < playersNum) {
      setActivePlayer(prevPlayer => prevPlayer + 1);
    } else {
      check();
      toggleModal();
    }
  };

  /**
   * Function to check the game result and set the corresponding message.
   */
  const check = useCallback(() => {
    const scores = Array.from(document.querySelectorAll('.score')).map(query =>
      Number(query.textContent)
    );
    const dealerScore = scores.splice(0, 1)[0];
    const playerScores = scores;
    const winningScores = playerScores.filter(score => score <= 21);
    const blackjackScores = playerScores.filter(score => score === 21);

    if (
      !winningScores.length ||
      winningScores.every(score => score < dealerScore)
    ) {
      setMessage('Dealer won!');
    } else if (
      (blackjackScores.length && dealerScore === 21) ||
      winningScores.some(score => score === dealerScore)
    ) {
      setMessage('Draw!');
    } else {
      const greatestScore = Math.max(...winningScores);
      const winners = playerScores.filter(score => score === greatestScore);

      if (winners.length === 1) {
        const number = playerScores.indexOf(greatestScore) + 1;
        setMessage(`Player ${number} won!`);
      } else {
        setMessage(`Draw!`);
      }
    }
  }, []);

  return (
    <Main>
      <Header />
      <Content>
        <Player
          name={'Dealer'}
          deck={deck}
          isActive={false}
          onPlayerEndTurn={() => {}}
        />
      </Content>
      <Playground>
        {players.map(playerId => (
          <Player
            name={`Player ${playerId}`}
            deck={deck}
            isActive={playerId === activePlayer}
            onPlayerEndTurn={handlePlayerEndTurn}
            key={playerId}
          />
        ))}
      </Playground>
      {isGameOver && (
        <Modal
          message={message}
          handlerCloseModal={toggleModal}
          setDeck={setDeck}
        />
      )}
    </Main>
  );
};
