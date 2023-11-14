import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  gap: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);

  h1 {
    font-size: 5rem;
    font-weight: 700;
    color: #fff;
  }

  p {
    font-size: 3rem;
    font-weight: 400;
    color: #fff;
  }
`;
