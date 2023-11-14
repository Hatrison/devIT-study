import styled from 'styled-components';

export const CardTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  flex-basis: calc((100% - 40px - 60px) / 3);
  width: 260px;
  border-radius: 10px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: flex-start;
  width: 100%;
`;

export const Points = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

export const Cards = styled.ul`
  display: flex;
  gap: 20px;
  align-self: flex-start;
  flex-wrap: wrap;
`;
