import styled from 'styled-components';

const CardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid black;
  backface-visibility: hidden;
  transition: transform 0.5s ease;
`;

export const Front = styled(CardSide)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  text-align: center;
  font-size: 24px;
`;

export const Back = styled(CardSide)`
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #000, #222);
`;

export const CardWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 150px;
  perspective: 1000px;
  color: ${({ color }) => color};

  &:hover ${Front} {
    transform: rotateY(180deg);
  }

  &:hover ${Back} {
    transform: rotateY(360deg);
  }
`;

export const Rank = styled.p`
  margin-top: 5px;
`;

export const Suit = styled.p`
  margin-bottom: 5px;
  font-size: 32px;
`;
