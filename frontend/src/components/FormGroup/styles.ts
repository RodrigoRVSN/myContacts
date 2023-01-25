import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 1rem;
  }

  small {
    color: ${({ theme }) => theme.colors?.danger.main};
    font-size: 0.8rem;
    display: block;
    margin-top: 0.5rem;
  }

  .form-item {
    position: relative;

    .loader-container {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
`;
