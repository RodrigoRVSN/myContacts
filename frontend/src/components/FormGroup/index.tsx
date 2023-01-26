import { ReactNode } from 'react';
import { Container } from './styles';
import { LoadingSpinner } from '../LoadingSpinner';

type FormGroupProps = {
  children: ReactNode,
  error?: ReactNode,
  isLoading?: boolean,
}

export function FormGroup({ children, error = null, isLoading = false }: FormGroupProps) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader-container">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}
