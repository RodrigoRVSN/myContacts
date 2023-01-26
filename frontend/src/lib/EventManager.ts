type IListener<T> = (payload: T) => void

export default class EventManager<T> {
  listeners: Map<unknown, Array<IListener<T>>>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: IListener<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: T) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)?.forEach((listener: IListener<T>) => {
      listener(payload);
    });
  }

  removeListener(event: string, listenerToRemove: IListener<T>) {
    const listeners = this.listeners.get(event);

    if (!listeners) return;

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);

    this.listeners.set(event, filteredListeners);
  }
}
