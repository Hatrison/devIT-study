import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  gap: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: calc(100vh - 40px);
`;

export const Invitation = styled.p`
  max-width: 70%;
  overflow-wrap: anywhere;
  font-size: 16px;
  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const Playground = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 50px;
  color: black;
`;

export const Message = styled.p`
  font-size: 30px;
  color: black;
`;
