import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Card, ListHeader } from './styles';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import { IContact } from '../../../../types/IContact';

type ContactsListProps = {
  filteredContacts: IContact[],
  orderBy: 'asc' | 'desc',
  onToggleOrderBy: () => void,
  onDeleteContact: (contact: IContact) => void,
}

export const ContactsList = memo(({
  filteredContacts, orderBy, onToggleOrderBy, onDeleteContact,
}: ContactsListProps) => (
  <>
    {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button onClick={onToggleOrderBy} type="button">
          <span>Nome</span>
          <img src={String(arrow)} alt="Arrow" />
        </button>
      </ListHeader>
    )}

    {filteredContacts.map((contact) => (
      <Card key={contact.id}>
        <div className="info">
          <div className="contact-name">
            <strong>{contact.name}</strong>

            {contact.category.name && (
              <small>{contact.category.name}</small>
            )}
          </div>
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
        </div>

        <div className="actions">
          <Link to={`/edit/${contact.id}`}>
            <img src={String(edit)} alt="edit" />
          </Link>

          <button type="button" onClick={() => onDeleteContact(contact)}>
            <img src={String(trash)} alt="trash" />
          </button>
        </div>
      </Card>
    ))}
  </>
));
