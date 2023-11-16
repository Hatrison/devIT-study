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
  selectIsGameOver,
  selectPlayers,
  selectRoomToken,
  selectTurnId,
  selectUserToken,
  selectWinningMessage,
} from '../../redux/room/selectors';
import { exitRoom } from '../../redux/room/operations';
import { toast } from 'react-toastify';
import { cleanRoom } from '../../redux/room/roomSlice';

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
 * @returns {ReactNode} The Playground component.
 */
const Playground = (): ReactNode => {
  const players = useAppSelector(selectPlayers);
  const dealer = useAppSelector(selectDealer);
  const roomToken = useAppSelector(selectRoomToken);
  const userToken = useAppSelector(selectUserToken);
  const id = useAppSelector(selectId);
  const turnId = useAppSelector(selectTurnId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isGameOver = useAppSelector(selectIsGameOver);
  const message = useAppSelector(selectWinningMessage);
  const [activePlayer, setActivePlayer] = useState<number>(1);

  /**
   * Effect to set the active player to the initial state when a new game starts.
   */
  useEffect(() => {
    setActivePlayer(id);
  }, [id]);

  const toggleModal = useCallback(() => {
    dispatch(cleanRoom());
    navigate('/start', { replace: true });
  }, [dispatch, isGameOver]);

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
        <Modal handlerCloseModal={toggleModal}>
          <Title>Game Over</Title>
          <Message>{message}</Message>
          <Button text={'Exit'} onClick={() => toggleModal()} />
        </Modal>
      )}
    </Main>
  );
};

export default Playground;
