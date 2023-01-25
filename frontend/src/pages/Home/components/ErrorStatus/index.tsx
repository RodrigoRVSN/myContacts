import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import { Container } from './styles';
import sad from '../../../../assets/images/sad.svg';

export const ErrorStatus = ({ onTryAgain }) => (
  <Container>
    <img src={sad} alt="Sad" />
    <div className="error_container">
      <strong>Ocorreu um erro ao obter os seus contatos!</strong>
      <Button onClick={onTryAgain}>Tentar novamente</Button>
    </div>
  </Container>
);

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
