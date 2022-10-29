import React from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';

export default function Presentation({
  isLoading, contactFormRef, contactName, handleSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm buttonLabel="Salvar" ref={contactFormRef} onSubmit={handleSubmit} />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactFormRef: PropTypes.object.isRequired,
  contactName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
