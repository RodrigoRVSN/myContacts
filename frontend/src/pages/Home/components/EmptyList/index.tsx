import { Container } from './styles';
import emptyBox from '../../../../assets/images/empty-box.svg';

export const EmptyList = () => (
  <Container>
    <img src={emptyBox} alt="Sem contatos" />
    <p>
      Você ainda não tem nenhum contato cadastrado!
      Clique no botão <strong>”Novo contato”</strong> à cima
      para cadastrar o seu primeiro!
    </p>
  </Container>
);
