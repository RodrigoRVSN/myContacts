import PropTypes from 'prop-types';
import { LoadingSpinner } from '../LoadingSpinner';
import { StyledButton } from './styles';

export default function Button({
  type, disabled, isLoading, children,
}) {
  return (
    <StyledButton
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
