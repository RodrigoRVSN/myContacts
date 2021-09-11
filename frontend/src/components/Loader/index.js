import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay } from './styles';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <Overlay>
        <div className="loader" />
      </Overlay>
    </>,
    document.getElementById('loader-root'),
  );
}
