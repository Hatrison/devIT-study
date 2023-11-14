import { useCallback, useEffect } from 'react';
import { ButtonWrapper, Main } from './Start.styled';
import { Header } from 'components/Header/Header';
import { Button } from 'components/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createRoom } from '../../redux/room/operations';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectRoomToken } from '../../redux/room/selectors';
import { useNavigate } from 'react-router-dom';

const ButtonStyle = {
  width: '200px',
  height: '50px',
  fontSize: '20px',
};

const Start = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectRoomToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/playground', { replace: true });
    }
  }, [token]);

  const onCreateGame = useCallback(() => {
    dispatch(createRoom());
  }, []);
  const onJoinGame = useCallback(() => {}, []);

  return (
    <Main>
      <Header />
      <ButtonWrapper>
        <Button
          style={ButtonStyle}
          text={'Create room'}
          onClick={onCreateGame}
        />
        <Button style={ButtonStyle} text={'Join room'} onClick={onJoinGame} />
      </ButtonWrapper>
    </Main>
  );
};

export default Start;
