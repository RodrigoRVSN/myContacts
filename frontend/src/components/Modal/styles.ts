import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div<{ isLeaving: boolean }>`
  background: rgba(0,0,0, 0.6);
  backdrop-filter: blur(7px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s;`}
`;

export const Container = styled.div<{ danger: boolean, isLeaving: boolean }>`
  background: ${({ theme }) => theme.colors?.primary.light};
  border-radius: 0.25rem;
  padding: 1.5rem;
  box-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 29rem;
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${scaleOut} 0.2s forwards;`}

  > h1 {
    margin-bottom: 2rem;
    font-size: 1.4rem;
    color: ${({ theme, danger }) => (
    danger ? theme.colors?.danger.dark : theme.colors?.dark
  )}
  }
`;

export const Footer = styled.footer`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button{
    background: transparent;
    border: none;
    font-size: 1rem;
    margin-right: 2rem;
    color: ${({ theme }) => theme.colors?.primary.dark};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
