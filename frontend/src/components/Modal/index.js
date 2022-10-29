import React from 'react';
import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';
import { ReactPortal } from '../ReactPortal';
import { useAnimationUnmount } from '../../hooks/useAnimationUnmount';

export function Modal({
  danger,
  title,
  children,
  isLoading,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  isVisible,
}) {
  const { animatedElementRef, shouldRender } = useAnimationUnmount(isVisible);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!isVisible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!isVisible}>
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
    </ReactPortal>
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
