import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  gap: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
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
