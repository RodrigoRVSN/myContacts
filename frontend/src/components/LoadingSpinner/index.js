import PropTypes from 'prop-types';
import { SpinnerLoader } from './styles';

export function LoadingSpinner({ size }) {
  return (
    <SpinnerLoader {...{ size }} />
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
};

LoadingSpinner.defaultProps = {
  size: 16,
};
