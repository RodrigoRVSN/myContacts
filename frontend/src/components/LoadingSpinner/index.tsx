import PropTypes from 'prop-types';
import { SpinnerLoader } from './styles';

type LoadingSpinnerProps = {
  size?: number
}

export function LoadingSpinner({ size = 16 }: LoadingSpinnerProps) {
  return (
    <SpinnerLoader {...{ size }} />
  );
}
