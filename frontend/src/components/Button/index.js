import PropTypes from 'prop-types';
import { LoadingSpinner } from '../LoadingSpinner';
import { StyledButton } from './styles';

export default function Button({
  type, disabled, isLoading, children, onClick, danger,
}) {
  return (
    <StyledButton
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      danger={danger}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: null,
};
