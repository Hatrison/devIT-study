import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #dbdbdb;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease-in-out;

  &:hover,
  &:focus {
    outline: none;
    background-color: #8f8d8d;
  }

  &:disabled {
    background-color: #8f8d8d;
    cursor: not-allowed;
  }
`;
