import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export const ToastContainer = () => (
  <Container>
    <ToastMessage text="Default" />
    <ToastMessage text="Error" type="danger" />
    <ToastMessage text="Success" type="success" />
  </Container>
);
