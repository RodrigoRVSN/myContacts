import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2rem;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  strong{
    color: ${({ theme }) => theme.colors?.primary.lighter};
    font-size: 1.5rem;
  }

  a{
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
        transition: transform 0.2s ease-in;
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

  .info{
    .contact-name{
    display: flex;
    align-items: center;

    small{
      color: ${({ theme }) => theme.colors?.primary.lighter};
      background: ${({ theme }) => theme.colors?.primary.main};
      font-weight: bold;
      text-transform: uppercase;
      padding: 0.25rem;
      border-radius: 0.25rem;
      margin-left: 0.5rem;
    }
  }
  span{
    display: block;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors?.primary.lighter};
  }
}
  .actions{
  display: flex;
  align-items: center;

  button{
    background: transparent;
    border: none;
    margin-left: 0.5rem;
  }
}
`;

export const InputSearchContainer = styled.header`
width: 100%;
input{
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
