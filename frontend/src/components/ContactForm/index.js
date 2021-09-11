import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';

export function ContactForm({ buttonLabel = '' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleSubmit() {
    console.log('teste');
  }

  function handleNameChange(event) {
    setName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    // phone.replace(/\D/g, '')
    setPhone(formatPhone(event.target.value));
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup error={getErrorMessageByFieldName('name')}>
          <Input
            error={getErrorMessageByFieldName('name')}
            placeholder="Nome *"
            onChange={handleNameChange}
            value={name}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            type="email"
            error={getErrorMessageByFieldName('email')}
            placeholder="E-mail"
            onChange={handleEmailChange}
            value={email}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="text"
            placeholder="Telefone"
            onChange={handlePhoneChange}
            value={phone}
            maxLength="15"
          />
        </FormGroup>

        <FormGroup>
          <Select
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">Categoria</option>
            <option value="discord">Discord</option>
            <option value="instagram">Instagram</option>
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
        </ButtonContainer>
      </Form>
    </>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string,
};

ContactForm.defaultProps = {
  buttonLabel: '',
};
