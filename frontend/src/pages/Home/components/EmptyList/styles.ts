import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    margin-top: 0.5rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.primary.light};

    strong{
      color: ${({ theme }) => theme.colors.primary.lighter};
    }
  }
`;
