import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  padding: 0 16px;
  height: 3rem;
  border: none;
  color: ${({ theme }) => theme.colors?.primary.lighter};
  background: ${({ theme }) => theme.colors?.primary.main};
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.04);
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  transition: ease-in 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    background: ${({ theme }) => theme.colors?.primary.light};
    color: ${({ theme }) => theme.colors?.primary.main};
  }

  &:active {
    background: ${({ theme }) => theme.colors?.primary.lighter};
  }

  &[disabled] {
    cursor: default;
    background: ${({ theme }) => theme.colors?.disabled};
    color: ${({ theme }) => theme.colors?.primary.main};
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors?.danger.main};

    &:hover{
      background: ${theme.colors?.danger.light};
    }

    &:active{
      background: ${theme.colors?.danger.dark};
    }
  `}
`;
