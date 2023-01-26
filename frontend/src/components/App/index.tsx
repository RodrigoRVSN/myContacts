// @ts-nocheck
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';

import defaultTheme from '../../assets/styles/themes/default';
import RouteR from '../../Router';
import Header from '../Header';
import { ToastContainer } from '../Toast/ToastContainer';
import { Container } from './styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <ToastContainer />

        <Container>
          <Header />
          <RouteR />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
