import {
  useTransition,
  useCallback, useEffect, useState,
} from 'react';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export const useHome = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [isDeleteModalVisible, setIsModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [isPending, startTransition] = useTransition();

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);

      setError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch (error) {
      setError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(ev) {
    const { value } = ev.target;

    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())));
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleToggleDeleteModal() {
    setIsModalVisible((prevState) => !prevState);
    setContactBeingDeleted(null);
  }

  const handleDeleteContact = useCallback((contact) => {
    handleToggleDeleteModal();
    setContactBeingDeleted(contact);
  }, []);

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
    isPending,
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
  };
};
