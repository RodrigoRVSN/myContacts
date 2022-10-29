import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors?.primary.dark};
    border: none;
    border-radius: 1.56rem;
    height: 3.2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    outline: 0;
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors?.primary.lighter};

    &::placeholder{
      color: ${({ theme }) => theme.colors?.primary.lighter};
    }
  }
`;
