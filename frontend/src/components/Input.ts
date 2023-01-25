import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  border: none;
  background: ${({ theme }) => theme.colors?.primary.dark};
  color: ${({ theme }) => theme.colors?.primary.lighter};
  border: 2px solid ${({ theme }) => theme.colors?.primary.dark};
  box-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.04);
  height: 3rem;
  padding: 2rem 1rem;
  border-radius: 0.25rem;
  outline: none;
  font-size: 1rem;
  transition: border-color ease-in 0.2s;
  appearance: none;

  &:focus{
    border-color: ${({ theme }) => theme.colors?.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors?.danger.light};
    border-color: ${theme.colors?.danger.dark} !important;
  `}

  &[disabled] {
    background:  ${({ theme }) => theme.colors?.primary.dark};
    border-color: ${({ theme }) => theme.colors?.primary.main};
    opacity: 1;
  }
`;
