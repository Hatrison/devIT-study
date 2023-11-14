import { Backdrop, Message, ModalContainer, Title } from './Modal.styled';
import { Button } from '../Button/Button';
import { createPortal } from 'react-dom';
import React, { useCallback, useEffect } from 'react';
import { Deck } from '../../services/Deck';

const modalRoot = document.querySelector('#modal-root');

type props = {
  message: string;
  handlerCloseModal: () => void;
  setDeck: React.Dispatch<React.SetStateAction<Deck>>;
};

/**
 * Modal component for displaying game over messages and providing a restart button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to be displayed in the modal.
 * @param {Function} props.handlerCloseModal - Callback to close the modal.
 * @param {React.Dispatch<React.SetStateAction<Deck>>} props.setDeck - State setter for the deck.
 * @returns {React.ReactPortal} The Modal component.
 */
export const Modal = ({
  message,
  handlerCloseModal,
  setDeck,
}: props): React.ReactPortal => {
  /**
   * Callback to handle the restart and reset the deck.
   */
  const onRestart = useCallback(() => {
    setDeck(new Deck());
    handlerCloseModal();
  }, [handlerCloseModal, setDeck]);

  /**
   * Callback to handle the Escape key press event and close the modal.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  const onEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onRestart();
        handlerCloseModal();
      }
    },
    [handlerCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onEsc]);

  /**
   * Callback to handle clicks on the backdrop and close the modal.
   * @param {React.MouseEvent} event - The mouse event.
   */
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      onRestart();
      handlerCloseModal();
    }
  }, []);

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContainer>
        <Title>Game Over</Title>
        <Message>{message}</Message>
        <Button text={'Restart'} onClick={() => onRestart()} />
      </ModalContainer>
    </Backdrop>,
    modalRoot as HTMLElement
  );
};
