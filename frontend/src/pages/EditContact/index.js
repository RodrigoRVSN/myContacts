import React from 'react';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';
import { useEditContact } from './useEditContact';

export default function EditContact() {
  const {
    isLoading, contactName, contactForm, handleSubmit,
  } = useEditContact();

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm buttonLabel="Salvar" ref={contactForm} onSubmit={handleSubmit} />
    </>
  );
}
