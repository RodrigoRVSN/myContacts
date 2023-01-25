import styled from 'styled-components';

export const Form = styled.form`
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

export const ButtonContainer = styled.div`
  margin-top: 2rem;

  button {
    width: 100%;
  }
`;
