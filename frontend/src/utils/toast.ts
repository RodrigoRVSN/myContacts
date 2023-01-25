import EventManager from '../lib/EventManager';

export type ToastParams = {
  type: string
  text: string
  duration?: number
}

export const toastEventManager = new EventManager();

export const toast = ({ type, text, duration }: ToastParams) => {
  toastEventManager.emit('addtoast', { type, text, duration });
};
