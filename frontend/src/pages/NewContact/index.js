import React, { useRef } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function NewContact() {
  const contactForm = useRef(null);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);
      contactForm.current.resetFields();

      toast({ type: 'success', text: 'Cadastro efetuado!', duration: 10000 });
    } catch (error) {
      toast({ type: 'danger', text: 'Houve um erro!' });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} ref={contactForm} />
    </>
  );
}
