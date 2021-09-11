import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors?.primary.lighter};
    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      span{
        color: ${({ theme }) => theme.colors?.primary.light};
        font-weight: bold;
      }

      img{
        margin-right: 0.5rem;
        transform: rotate(-90deg);
      }
    }
`;
