import { useEffect, memo } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

type ToastMessageProps = {
  message: {
    text: string,
    type: 'default' | 'success' | 'danger',
    id: number,
    duration?: number,
  },
  onRemoveMessage: (messageId: number) => void,
  isLeaving: boolean,
  animatedRef: object,
}


export const ToastMessage = memo(({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}: ToastMessageProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => clearTimeout(timeout);
  }, [message, onRemoveMessage]);

  const handleClickMessage = () => {
    onRemoveMessage(message.id);
  };

  return (
    <Container
      type={message.type}
      onClick={handleClickMessage}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={String(xCircleIcon)} alt="X" />}
      {message.type === 'success' && <img src={String(checkCircleIcon)} alt="X" />}
      <strong>{message.text}</strong>
    </Container>
  );
});
