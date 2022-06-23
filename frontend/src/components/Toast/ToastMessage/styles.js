import styled, { css } from 'styled-components';

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.primary.lighter};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding: 1rem 2rem;
  color: #FFF;
  border-radius: 0.25rem;
  box-shadow: 0 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 1rem;
  }

  img {
    margin-right: 0.5rem;
  }
`;
