import styled from 'styled-components';
import { Button as OrigButton } from 'components/Button/Button';

export const Main = styled.main`
  display: flex;
  gap: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
`;
