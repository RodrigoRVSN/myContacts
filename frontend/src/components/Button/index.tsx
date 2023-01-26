import { LoadingSpinner } from '../LoadingSpinner';
import { StyledButton } from './styles';
import { ReactNode } from 'react';

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean,
  isLoading?: boolean,
  danger?: boolean,
  onClick?: () => void,
  children: ReactNode,
}

export default function Button({
  type = 'button', disabled = false, isLoading = false, children, onClick = () => { }, danger = false,
}: ButtonProps) {
  return (
    <StyledButton
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      danger={danger}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
}
