import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  margin-top: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  padding-bottom: 1rem;

  strong{
    color: ${({ theme }) => theme.colors?.primary.lighter};
    font-size: 1.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors?.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors?.primary.main};
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.2s ease-in;

    &:hover{
      background-color: ${({ theme }) => theme.colors?.primary.main};
      color: ${({ theme }) => theme.colors?.primary.light};
    }
  }
`;
