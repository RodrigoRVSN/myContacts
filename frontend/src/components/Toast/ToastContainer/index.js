import { useEffect, useState } from 'react';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export const ToastContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const addToast = ({ detail }) => {
      setMessages([...messages, { id: Math.random(), type: detail.type, text: detail.text }]);
    };

    document.addEventListener('addtoast', addToast);

    return () => document.removeEventListener('addtoast', addToast);
  }, [messages]);

  return (
    <Container>
      {messages.map(({ id, type, text }) => (
        <ToastMessage key={id} text={text} type={type} />
      ))}
    </Container>
  );
};
