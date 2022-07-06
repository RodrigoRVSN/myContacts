import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const contactForm = useRef(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contact = await ContactsService.getContactById(id);

        contactForm.current.setFieldValues(contact);
        setContactName(contact.name);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({ type: 'danger', text: 'Contato nao existe!' });
      }
    };

    loadContacts();
  }, [history, id]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const { name } = await ContactsService.updateContact(id, contact);
      setContactName(name);
      toast({ type: 'success', text: 'Contato editado com sucesso!', duration: 10000 });
    } catch (error) {
      toast({ type: 'danger', text: 'Houve um erro!' });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm buttonLabel="Salvar" ref={contactForm} onSubmit={handleSubmit} />
    </>
  );
}
