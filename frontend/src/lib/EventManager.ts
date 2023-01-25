import { ToastParams } from '../utils/toast'

type IListener = (payload: ToastParams) => void

export default class EventManager {
  listeners: Map<unknown, Array<IListener>>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: IListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: ToastParams) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)?.forEach((listener: IListener) => {
      listener(payload);
    });
  }

  removeListener(event: string, listenerToRemove: IListener) {
    const listeners = this.listeners.get(event);

    if (!listeners) return;

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);

    this.listeners.set(event, filteredListeners);
  }
}
