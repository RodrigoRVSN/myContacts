export type ToastMessageParams = {
  text: string,
  type: 'default' | 'success' | 'danger',
  id: number,
  duration?: number,
}

export type ToastEvent = Omit<ToastMessageParams, 'id'>

export type ToastMessageProps = {
  message: ToastMessageParams,
  onRemoveMessage: (messageId: number) => void,
  isLeaving: boolean,
  animatedRef: object,
}