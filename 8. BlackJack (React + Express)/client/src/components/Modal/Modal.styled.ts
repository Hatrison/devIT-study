import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  width: 500px;
`;

export const Title = styled.h2`
  font-size: 50px;
  color: black;
`;

export const Message = styled.p`
  font-size: 30px;
  color: black;
`;
