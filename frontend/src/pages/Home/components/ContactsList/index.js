import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, ListHeader } from './styles';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

export const ContactsList = ({
  filteredContacts, orderBy, onToggleOrderBy, onDeleteContact,
}) => (
  <>
    {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button onClick={onToggleOrderBy} type="button">
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>
    )}
    {console.log(filteredContacts)}
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
            <img src={edit} alt="edit" />
          </Link>

          <button type="button" onClick={() => onDeleteContact(contact)}>
            <img src={trash} alt="trash" />
          </button>
        </div>
      </Card>
    ))}
  </>
);

ContactsList.propTypes = {
  filteredContacts: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
