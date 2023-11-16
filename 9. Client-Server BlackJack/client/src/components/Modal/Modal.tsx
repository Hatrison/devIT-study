import { Backdrop, ModalContainer } from './Modal.styled';
import { createPortal } from 'react-dom';
import React, { ReactNode, useCallback, useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

type props = {
  handlerCloseModal: () => void;
  children?: ReactNode;
};

/**
 * Modal component for displaying game over messages and providing a restart button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handlerCloseModal - Callback to close the modal.
 * @returns {React.ReactPortal} The Modal component.
 */
export const Modal = ({
  handlerCloseModal,
  children,
}: props): React.ReactPortal => {
  /**
   * Callback to handle the restart and reset the deck.
   */
  const onRestart = useCallback(() => {
    //setDeck(new Deck());
    handlerCloseModal();
  }, [handlerCloseModal]);

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
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>,
    modalRoot as HTMLElement
  );
};
