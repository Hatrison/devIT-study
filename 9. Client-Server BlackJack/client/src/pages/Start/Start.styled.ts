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

export const Form = styled.form`
  width: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Message = styled.p`
  font-size: 30px;
  color: black;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
  transition: border-color 0.3s ease-in-out;

  &:focus,
  &:hover {
    outline: none;
    border-color: #8f8d8d;
  }
`;
