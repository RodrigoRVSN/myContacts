import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export const ToastMessage = memo(({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}) => {
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
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="X" />}
      <strong>{message.text}</strong>
    </Container>
  );
});

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    id: PropTypes.number,
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.object.isRequired,
};
