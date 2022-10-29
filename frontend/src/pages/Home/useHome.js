import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export const useHome = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [isDeleteModalVisible, setIsModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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

  function handleToggleDeleteModal() {
    setIsModalVisible((prevState) => !prevState);
    setContactBeingDeleted(null);
  }

  function handleDeleteContact(contact) {
    handleToggleDeleteModal();
    setContactBeingDeleted(contact);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      toast({ type: 'success', text: 'Deletado!!' });
      handleToggleDeleteModal();
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
    } catch {
      toast({ type: 'error', text: 'Eita crabumco, erro!!' });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
};
