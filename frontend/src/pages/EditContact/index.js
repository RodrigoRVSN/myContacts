import React from 'react';
import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function EditContact() {
  return (
    <>
      <PageHeader title="Editar Contato" />
      <ContactForm buttonLabel="Salvar" />
    </>
  );
}
