import { Link } from 'react-router-dom';
import { Container } from './styles';

type HeaderProps = {
  hasError: boolean,
  qtyContacts: number,
  qtyFilteredContacts: number,
}

export const Header = ({ hasError, qtyContacts, qtyFilteredContacts }: HeaderProps) => {
  const hasContacts = qtyContacts > 0 ? 'space-between' : 'center';
  const alignment = hasError ? 'flex-end' : hasContacts;

  return (
    <Container justifyContent={alignment}>
      {(!hasError && qtyContacts > 0) && (
        <strong>
          {qtyFilteredContacts > 0
            ? `${qtyFilteredContacts} ${qtyFilteredContacts > 1 ? ' contatos' : ' contato'
            }`
            : 'Nenhum contato!'}
        </strong>
      )}

      <Link to="/new">Novo Contato</Link>
    </Container>
  );
};