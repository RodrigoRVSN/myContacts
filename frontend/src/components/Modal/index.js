import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';

export function Modal({
  danger, title, children, isLoading, cancelLabel, confirmLabel, onCancel, onConfirm, isVisible,
}) {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>

          {children}

          <Footer>
            <button
              className="cancel-button"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              isLoading={isLoading}
              type="button"
              danger={danger}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
