/* eslint-disable no-nested-ternary */
import React from 'react';
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
import Button from '../../components/Button';
import { Modal } from '../../components/Modal';
import { useHome } from './useHome';

export function Home() {
  const {
    loading,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleToggleDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

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
                  <button type="button" onClick={() => handleDeleteContact(contact)}>
                    <img src={trash} alt="trash" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}

      </Container>

      <Modal
        danger
        isVisible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        cancelLabel="Cancelar"
        confirmLabel="Confirmar"
        onCancel={handleToggleDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </>
  );
}
