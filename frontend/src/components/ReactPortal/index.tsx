import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

type ReactPortalProps = {
  containerId?: string,
  children: ReactNode,
}

export function ReactPortal({ containerId = 'portal-root', children }: ReactPortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}