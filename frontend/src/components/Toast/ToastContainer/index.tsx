import { useEffect } from 'react';
import { useAnimatedList } from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';
import { ToastMessage } from '../ToastMessage';
import { ToastMessageParams, ToastEvent } from '../ToastMessage/ToastMessage.types';
import { Container } from './styles';

export const ToastContainer = () => {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList<ToastMessageParams>();

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }: ToastEvent) => {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    };

    toastEventManager.on('addtoast', handleAddToast);

    return () => toastEventManager.removeListener('addtoast', handleAddToast);
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
};
