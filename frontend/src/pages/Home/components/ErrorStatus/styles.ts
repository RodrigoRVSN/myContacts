import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-top: 1rem;

  .error_container{
    margin-left: 1.5rem;

    strong{
      font-size: 1.375rem;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.primary.lighter};
      display: block;
    }
  }
`;
