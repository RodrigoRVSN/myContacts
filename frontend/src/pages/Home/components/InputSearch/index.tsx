import { ChangeEvent } from 'react';
import { Container } from './styles';

type InputSearchProps = {
  value: string,
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void,
}


export const InputSearch = ({ value, onChange }: InputSearchProps) => (
  <Container>
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Procure pelo contato"
    />
  </Container>
);
