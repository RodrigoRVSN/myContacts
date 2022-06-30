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

  const handleDeleteMessage = (id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  };

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} message={message} onDeleteToast={handleDeleteMessage} />
      ))}
    </Container>
  );
};
