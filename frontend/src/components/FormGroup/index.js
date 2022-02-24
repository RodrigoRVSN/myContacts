import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import { LoadingSpinner } from '../LoadingSpinner';

export function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}
        {isLoading && (
        <div className="loader-container">
          <LoadingSpinner />
        </div>
        )}

      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
