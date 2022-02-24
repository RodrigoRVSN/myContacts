import React from 'react';
import ReactDOM from 'react-dom';
import { LoadingSpinner } from '../LoadingSpinner';
import { Overlay } from './styles';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <Overlay>
        <LoadingSpinner size={90} />
      </Overlay>
    </>,
    document.getElementById('loader-root'),
  );
}
