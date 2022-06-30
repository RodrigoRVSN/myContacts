import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export const toast = ({ type, text, duration }) => {
  toastEventManager.emit('addtoast', { type, text, duration });
};
