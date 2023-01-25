import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import { DomainContact, IContact } from '../../types/IContact';
import { toast } from '../../utils/toast';

export const useEditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const contactForm = useRef<{setFieldValues: (contact: IContact) => void}>(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    const loadContacts = async () => {
      try {
        const contact = await ContactsService.getContactById(String(id), controller.signal);

        safeAsyncAction(() => {
          contactForm.current!.setFieldValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          safeAsyncAction(() => {
            navigate('/');
            toast({ type: 'danger', text: 'Contato nao existe!' });
          });
        }
      }
    };

    loadContacts();

    return () => {
      controller.abort();
    };
  }, [history, id, safeAsyncAction]);

  async function handleSubmit(contact: DomainContact) {
    try {
      const { name } = await ContactsService.updateContact(String(id), contact);
      setContactName(name);
      toast({ type: 'success', text: 'Contato editado com sucesso!', duration: 10000 });
    } catch (error) {
      toast({ type: 'danger', text: 'Houve um erro!' });
    }
  }

  return {
    isLoading, contactName, contactForm, handleSubmit,
  };
};
