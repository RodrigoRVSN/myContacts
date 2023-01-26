import type { ToastEvent } from '../components/Toast/ToastMessage/ToastMessage.types';
import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager<ToastEvent>();

export const toast = ({ type, text, duration }: ToastEvent) => {
  toastEventManager.emit('addtoast', { type, text, duration });
};
