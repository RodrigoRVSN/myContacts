/* eslint-disable no-nested-ternary */
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
  NoContactsContainer,
  NotFoundFilteredContacts,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

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

        {contacts.length > 0 && (
          <InputSearchContainer>
            <input
              value={searchTerm}
              onChange={(ev) => handleChangeSearchTerm(ev)}
              type="text"
              placeholder="Procure pelo contato"
            />
          </InputSearchContainer>
        )}

        <Header justifyContent={
          hasError
            ? 'flex-end'
            : (contacts.length > 0
              ? 'space-between'
              : 'center')
        }
        >
          {(!hasError && contacts.length > 0) && (
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
            {contacts.length < 1 && (
              <NoContactsContainer>
                <img src={emptyBox} alt="Sem contatos" />
                <p>
                  Você ainda não tem nenhum contato cadastrado!
                  Clique no botão <strong>”Novo contato”</strong> à cima
                  para cadastrar o seu primeiro!
                </p>
              </NoContactsContainer>
            )}

            {filteredContacts.length > 0 && (
              <ListHeader orderBy={orderBy}>
                <button onClick={handleToggleOrderBy} type="button">
                  <span>Nome</span>
                  <img src={arrow} alt="Arrow" />
                </button>
              </ListHeader>
            )}

            {(contacts.length > 0 && filteredContacts.length < 1)
              && (
                <NotFoundFilteredContacts>
                  <img src={magnifierQuestion} alt="magnifierQuestion" />
                  <span>
                    Nenhum resultado foi encontrado para <b>{searchTerm}</b>.
                  </span>
                </NotFoundFilteredContacts>
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
