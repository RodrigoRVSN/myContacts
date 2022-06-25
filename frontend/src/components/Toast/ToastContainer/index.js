import { useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export const ToastContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages([
        ...messages,
        {
          id: Math.random(),
          type,
          text,
        },
      ]);
    };

    toastEventManager.on('addtoast', handleAddToast);

    return () => toastEventManager.removeListener('addtoast', handleAddToast);
  }, [messages]);

  return (
    <Container>
      {messages.map(({ id, type, text }) => (
        <ToastMessage key={id} text={text} type={type} />
      ))}
    </Container>
  );
};
