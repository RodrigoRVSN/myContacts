import {
  useDeferredValue,
  useCallback, useEffect, useState, useMemo, ChangeEvent,
} from 'react';

import ContactsService from '../../services/ContactsService';
import { IContact } from '../../types/IContact';
import { toast } from '../../utils/toast';

export const useHome = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [isDeleteModalVisible, setIsModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<IContact | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())),
    [contacts, deferredSearchTerm],
  );

  const loadContacts = useCallback(async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy, signal!);

      setError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      setError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(ev: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(ev.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleToggleDeleteModal() {
    setIsModalVisible((prevState) => !prevState);
    setContactBeingDeleted(null);
  }

  const handleDeleteContact = useCallback((contact: IContact) => {
    handleToggleDeleteModal();
    setContactBeingDeleted(contact);
  }, []);

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted!.id);

      toast({ type: 'success', text: 'Deletado!!' });
      handleToggleDeleteModal();

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted!.id,
      ));
    } catch {
      toast({ type: 'error', text: 'Eita crabumco, erro!!' });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
