import styled, { css, keyframes } from 'styled-components';
import type { ToastMessageParams } from './ToastMessage.types';

type ContainerProps = Pick<ToastMessageParams, 'type'> & { isLeaving: boolean }

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.primary.lighter};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div<ContainerProps>`
  padding: 1rem 2rem;
  color: #FFF;
  border-radius: 0.25rem;
  box-shadow: 0 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s forwards;`}

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 1rem;
  }

  img {
    margin-right: 0.5rem;
  }
`;
