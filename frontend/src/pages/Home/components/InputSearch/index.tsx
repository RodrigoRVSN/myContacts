import PropTypes from 'prop-types';
import { Container } from './styles';

export const InputSearch = ({ value, onChange }) => (
  <Container>
    <input
      value={value}
      onChange={(ev) => onChange(ev)}
      type="text"
      placeholder="Procure pelo contato"
    />
  </Container>
);

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
