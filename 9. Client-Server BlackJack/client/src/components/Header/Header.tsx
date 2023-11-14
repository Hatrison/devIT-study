import React, { ReactNode } from 'react';
import { Title } from './Header.styled';

/**
 * Header component for the Blackjack game.
 *
 * @component
 * @returns {ReactNode} The Header component.
 */
export const Header = (): ReactNode => {
  return <Title>BlackJack</Title>;
};
