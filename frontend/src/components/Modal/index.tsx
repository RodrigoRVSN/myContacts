import { ReactNode } from 'react';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';
import { ReactPortal } from '../ReactPortal';
import { useAnimationUnmount } from '../../hooks/useAnimationUnmount';

type ModalProps = {
  danger?: boolean,
  title: string,
  children: ReactNode,
  isLoading?: boolean,
  cancelLabel?: string,
  confirmLabel?: string,
  onCancel: () => void,
  onConfirm: () => void,
  isVisible: boolean,
}

export function Modal({
  danger = false,
  title,
  children,
  isLoading = false,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  isVisible,
}: ModalProps) {
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