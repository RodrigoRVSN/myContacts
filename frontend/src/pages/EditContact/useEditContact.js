import { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export const useEditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const contactForm = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactForm.current.setFieldValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({ type: 'danger', text: 'Contato nao existe!' });
        });
      }
    };

    loadContacts();
  }, [history, id, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const { name } = await ContactsService.updateContact(id, contact);
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
