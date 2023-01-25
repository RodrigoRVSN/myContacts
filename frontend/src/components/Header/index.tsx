import React from 'react';
import { Container } from './styles';

import logo from '../../assets/images/icons/logo.svg';

export default function Header() {
  return (
    <Container><img src={logo} alt="Logo MyContacts" /></Container>
  );
}
