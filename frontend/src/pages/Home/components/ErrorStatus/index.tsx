import Button from '../../../../components/Button';
import { Container } from './styles';
import sad from '../../../../assets/images/sad.svg';

type ErrorStatusProsp = {
  onTryAgain: () => void
}

export const ErrorStatus = ({ onTryAgain }: ErrorStatusProsp) => (
  <Container>
    <img src={String(sad)} alt="Sad" />
    <div className="error_container">
      <strong>Ocorreu um erro ao obter os seus contatos!</strong>
      <Button onClick={onTryAgain}>Tentar novamente</Button>
    </div>
  </Container>
);
