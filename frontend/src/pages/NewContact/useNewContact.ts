import { FormEventHandler, MutableRefObject, useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import { DomainContact } from '../../types/IContact';
import { toast } from '../../utils/toast';

export const useNewContact = () => {
  const contactFormRef = useRef<{resetFields: () => void}>()

  async function handleSubmit(contact: DomainContact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current!.resetFields();

      toast({ type: 'success', text: 'Cadastro efetuado!', duration: 10000 });
    } catch (error) {
      toast({ type: 'danger', text: 'Houve um erro!' });
    }
  }

  return { contactFormRef, handleSubmit };
};

