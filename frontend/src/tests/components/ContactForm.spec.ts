import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from '../../components/ContactForm';

describe('<ContactForm />', () => {
  it('should render edit contacts page', () => {
    const { container } = render(<ContactForm />);
    expect(container).toMatchSnapshot();
  });

  it('should match the value typed and the expected', () => {
    const fn = jest.fn();
    render(<ContactForm handleNameChange={fn} />);

    expect(screen.queryByPlaceholderText(/Nome */i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Telefone/i)).toBeInTheDocument();

    const inputName = screen.getByPlaceholderText(/Nome */i);
    const nameValue = 'nome digitado';
    userEvent.type(inputName, nameValue);
    expect(inputName.value).toBe(nameValue);

    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    const emailValue = 'rodrigo@email.com';
    userEvent.type(inputEmail, emailValue);
    expect(inputEmail.value).toBe(emailValue);

    const inputTel = screen.getByPlaceholderText(/Telefone/i);
    const telValue = '(15) 94002-8922';
    userEvent.type(inputTel, telValue);
    expect(inputTel.value).toBe(telValue);
  });

  it('should work correctly the button logic to disable', () => {
    const { getByRole } = render(<ContactForm />);

    const inputName = screen.getByPlaceholderText(/Nome */i);
    const nameValue = 'nome digitado';
    userEvent.type(inputName, nameValue);

    if (inputName.value !== '') {
      expect(getByRole('button')).not.toBeDisabled();
    } else {
      expect(getByRole('button')).toBeDisabled();
    }
  });
});
