import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Card,
  InputSearchContainer,
  ListHeader,
  ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import { Loader } from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import Button from '../../components/Button';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [contacts, searchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setError(false);
      setContacts(contactsList);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(ev) {
    setSearchTerm(ev.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <>
      <Container>
        <Loader isLoading={loading} />
        <InputSearchContainer>
          <input
            value={searchTerm}
            onChange={(ev) => handleChangeSearchTerm(ev)}
            type="text"
            placeholder="Procure pelo contato"
          />
        </InputSearchContainer>
        <Header hasError={hasError}>
          {!hasError
            && (
              <strong>
                {filteredContacts.length > 0
                  ? `${filteredContacts.length} ${filteredContacts.length > 1 ? ' contatos' : ' contato'
                  }`
                  : 'Nenhum contato!'}
              </strong>
            )}
          <Link to="/new">Novo Contato</Link>
        </Header>

        {hasError && (
          <ErrorContainer>
            <img src={sad} alt="Sad" />
            <div className="error_container">
              <strong>Ocorreu um erro ao obter os seus contatos!</strong>
              <Button onClick={handleTryAgain}>Tentar novamente</Button>
            </div>
          </ErrorContainer>
        )}

        {!hasError && (
          <>
            {filteredContacts.length > 0 && (
              <ListHeader orderBy={orderBy}>
                <button onClick={handleToggleOrderBy} type="button">
                  <span>Nome</span>
                  <img src={arrow} alt="Arrow" />
                </button>
              </ListHeader>
            )}

            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category_name && (
                      <small>{contact.category_name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>
                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="edit" />
                  </Link>
                  <button type="button">
                    <img src={trash} alt="trash" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}

      </Container>
    </>
  );
}
