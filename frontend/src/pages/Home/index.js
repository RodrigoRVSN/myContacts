import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Card,
  InputSearchContainer,
  ListHeader,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { Loader } from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [contacts, searchTerm],
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(ev) {
    setSearchTerm(ev.target.value);
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
        <Header>
          <strong>
            {filteredContacts.length > 0
              ? `${filteredContacts.length} ${
                filteredContacts.length > 1 ? ' contatos' : ' contato'
              }`
              : 'Nenhum contato!'}
          </strong>
          <Link to="/new">Novo Contato</Link>
        </Header>

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
      </Container>
    </>
  );
}
