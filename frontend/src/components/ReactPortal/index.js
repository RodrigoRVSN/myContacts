import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export function ReactPortal({ containerId = 'portal-root', children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};
