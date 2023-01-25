import styled from 'styled-components';

export const ListHeader = styled.header`
    margin-top: 2rem;
    margin-bottom: 0.5rem;

    button{
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

    span{
      margin-right: 0.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors?.primary.light};
    }

    img{
      transition: transform 0.2s ease -in;
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors?.primary.dark};
  color: ${({ theme }) => theme.colors?.primary.light};
  box-shadow: 0px 0.25rem 0.6rem rgba(0, 0, 0, 0.04);
  padding: 1rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 1rem;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        color: ${({ theme }) => theme.colors?.primary.lighter};
        background: ${({ theme }) => theme.colors?.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 0.25rem;
        border-radius: 0.25rem;
        margin-left: 0.5rem;
      }
    }

    span {
      display: block;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      color: ${({ theme }) => theme.colors?.primary.lighter};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 0.5rem;
    }
  }
`;
