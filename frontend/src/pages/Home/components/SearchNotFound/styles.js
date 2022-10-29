import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;

  span {
    margin-left: 1.5rem;
    color: ${({ theme }) => theme.colors.primary.light};
    word-break: break-all;
  }
`;
