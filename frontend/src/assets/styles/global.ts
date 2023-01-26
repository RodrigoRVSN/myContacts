import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary.lighter};
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  button, input {
    outline: none;
  }
`;
