import React, { ReactNode, useCallback } from 'react';
import {
  Content,
  Invitation,
  Main,
  Playground as StyledPlayground,
  Title,
  Message,
} from './Playground.styled';
import { Header } from 'components/Header/Header';
import { Player } from 'components/Player/Player';
import { Modal } from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import { Button } from 'components/Button/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectDealer,
  selectId,
  selectPlayers,
  selectRoomToken,
  selectTurnId,
  selectUserToken,
} from '../../redux/room/selectors';
import { exitRoom } from '../../redux/room/operations';
import { toast } from 'react-toastify';

type props = {
  playersNum: number;
};

const ButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  width: '80px',
  height: '40px',
  fontSize: '20px',
};

/**
 * Playground component for the card game.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.playersNum - The number of players in the game.
 * @returns {ReactNode} The Playground component.
 */
const Playground = ({ playersNum }: props): ReactNode => {
  const players = useAppSelector(selectPlayers);
  const dealer = useAppSelector(selectDealer);
  const roomToken = useAppSelector(selectRoomToken);
  const userToken = useAppSelector(selectUserToken);
  const id = useAppSelector(selectId);
  const turnId = useAppSelector(selectTurnId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  /**
   * Effect to set the active player to the initial state when a new game starts.
   */
  useEffect(() => {
    setActivePlayer(id);
  }, [id]);

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

  const onExit = useCallback(() => {
    dispatch(exitRoom({ roomToken, userToken }));
    navigate('/start', { replace: true });
  }, []);

  const copyToClipboard = useCallback(() => {
    if (!roomToken) return;
    navigator.clipboard.writeText(roomToken).then(() => {
      toast.success('Copied to clipboard');
    });
  }, [roomToken]);

  return (
    <Main>
      <Button text={'Exit'} onClick={onExit} style={ButtonStyle} />
      <Header />
      <Invitation onClick={copyToClipboard}>{roomToken}</Invitation>
      <Content>
        <Player
          name={'Dealer'}
          cards={dealer.hand}
          score={dealer.score}
          isActive={false}
        />
      </Content>
      <StyledPlayground>
        {players.map(player => (
          <Player
            name={`Player ${player.id}`}
            cards={player.hand}
            score={player.score}
            isActive={turnId === activePlayer && turnId === player.id}
            key={player.id}
          />
        ))}
      </StyledPlayground>
      {isGameOver && (
        <Modal handlerCloseModal={toggleModal} setDeck={() => {}}>
          <Title>Game Over</Title>
          <Message>{message}</Message>
          <Button text={'Restart'} onClick={() => toggleModal()} />
        </Modal>
      )}
    </Main>
  );
};

export default Playground;
