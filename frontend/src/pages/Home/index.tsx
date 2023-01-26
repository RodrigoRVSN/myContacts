import React from 'react';
import {
  Container,
} from './styles';

import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { useHome } from './useHome';
import { InputSearch } from './components/InputSearch';
import { Header } from './components/Header';
import { ErrorStatus } from './components/ErrorStatus';
import { EmptyList } from './components/EmptyList';
import { SearchNotFound } from './components/SearchNotFound';
import { ContactsList } from './components/ContactsList';

export function Home() {
  const {
    isLoading,
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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyContacts={contacts.length}
        qtyFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
      <>
        <ContactsList
          filteredContacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
          orderBy={orderBy}
          onToggleOrderBy={handleToggleOrderBy}
        />

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
      )}
    </Container>
  );
}
