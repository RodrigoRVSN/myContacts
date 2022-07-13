import styled from 'styled-components';

export const Overlay = styled.div`
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
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors?.primary.light};
  border-radius: 0.25rem;
  padding: 1.5rem;
  box-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 29rem;

  h1 {
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
