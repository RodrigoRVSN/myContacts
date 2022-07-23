import PropTypes from 'prop-types';
import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { ReactPortal } from '../ReactPortal';
import { Overlay } from './styles';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">

      <Overlay>
        <LoadingSpinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
