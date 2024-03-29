import {
  forwardRef, useEffect, useState, useImperativeHandle, FormEvent, ChangeEvent,
} from 'react';

import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';
import { DomainContact, IContact } from '../../types/IContact';
import { ICategory } from '../../types/ICategory';

type ContactFormProps = {
  buttonLabel: string,
  onSubmit: (contact: DomainContact) => void,
}

export const ContactForm = forwardRef(({ buttonLabel = '', onSubmit }: ContactFormProps, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState<ICategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  } = useErrors();

  useImperativeHandle(ref, () => ({
    setFieldValues: (contact: IContact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone(formatPhone(''));
      setCategoryId('');
    },
  }), []);

  const isFormValid = (name && errors.length === 0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    // phone.replace(/\D/g, '')
    setPhone(formatPhone(event.target.value));
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryId(event.target.value);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(controller.signal);
        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          onChange={handleNameChange}
          value={name}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          onChange={handleEmailChange}
          value={email}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          placeholder="Telefone"
          onChange={handlePhoneChange}
          value={phone}
          maxLength={15}
          disabled={isSubmitting}
        />

      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          onChange={handleCategoryChange}
          value={categoryId}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});
