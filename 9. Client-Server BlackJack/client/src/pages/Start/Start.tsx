import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import { ButtonWrapper, Form, Input, Main, Message } from './Start.styled';
import { Header } from 'components/Header/Header';
import { Button } from 'components/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createRoom, joinRoom } from '../../redux/room/operations';
import { Modal } from '../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUserToken } from '../../redux/room/selectors';
import { cleanRoom } from '../../redux/room/roomSlice';
import { toast } from 'react-toastify';

const ButtonStyle = {
  width: '200px',
  height: '50px',
  fontSize: '20px',
};

const Start = () => {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(selectUserToken);
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [invitationToken, setInvitationToken] = useState<string>('');

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  };

  const onCreateGame = useCallback(() => {
    dispatch(createRoom()).then(() => {
      navigate('/playground', { replace: true });
    });
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInvitationToken(e.target.value);
  }, []);

  const onJoin = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(joinRoom({ roomToken: invitationToken, userToken })).then(
        response => {
          if (response.meta.requestStatus !== 'fulfilled') {
            dispatch(cleanRoom());
            return;
          }
          navigate('/playground');
        }
      );
    },
    [invitationToken]
  );

  return (
    <Main>
      <Header />
      <ButtonWrapper>
        <Button
          style={ButtonStyle}
          text={'Create room'}
          onClick={onCreateGame}
        />
        <Button
          style={ButtonStyle}
          text={'Join room'}
          onClick={() => toggleModal()}
        />
      </ButtonWrapper>
      {modalOpened && (
        <Modal handlerCloseModal={() => toggleModal()} setDeck={() => {}}>
          <Form>
            <Message>Enter room token</Message>
            <Input value={invitationToken} onChange={onChange} />
            <Button
              type="submit"
              text={'Join'}
              onClick={(event: SyntheticEvent) => onJoin(event)}
            />
          </Form>
        </Modal>
      )}
    </Main>
  );
};

export default Start;
