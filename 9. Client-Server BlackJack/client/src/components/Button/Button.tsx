import React, { ReactNode, SyntheticEvent } from 'react';
import { StyledButton } from './Button.styled';

type props = {
  text: string;
  disabled?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
};

/**
 * Button component for interactive actions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content of the button.
 * @param {boolean} [props.disabled=false] - A flag indicating whether the button is disabled.
 * @param {() => void} [props.onClick] - The callback function to be executed on button click.
 * @returns {ReactNode} The Button component.
 */
export const Button = ({
  text,
  disabled = false,
  onClick,
  style,
  type = 'button',
}: props): ReactNode => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {text}
    </StyledButton>
  );
};
