import PropTypes from 'prop-types';
import { SpinnerLoader } from './styles';

export function LoadingSpinner({ size = 16 }) {
  return (
    <SpinnerLoader {...{ size }} />
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
};
