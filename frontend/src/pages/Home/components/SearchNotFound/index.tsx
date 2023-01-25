import React from 'react';
import PropTypes from 'prop-types';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import { Container } from './styles';

export const SearchNotFound = ({ searchTerm }) => (
  <Container>
    <img src={magnifierQuestion} alt="magnifierQuestion" />
    <span>
      Nenhum resultado foi encontrado para <b>{searchTerm}</b>.
    </span>
  </Container>
);

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
