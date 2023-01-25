import React from 'react';
import PropTypes from 'prop-types';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import { Container } from './styles';

type SearchNotFoundProps = {
  searchTerm: string
}

export const SearchNotFound = ({ searchTerm }: SearchNotFoundProps) => (
  <Container>
    <img src={String(magnifierQuestion)} alt="magnifierQuestion" />
    <span>
      Nenhum resultado foi encontrado para <b>{searchTerm}</b>.
    </span>
  </Container>
);

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
