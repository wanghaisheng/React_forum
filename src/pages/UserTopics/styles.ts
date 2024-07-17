import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  a {
    text-decoration: none;
  }

  .no-topics {
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};

    a {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 500;
      transition: 0.2s;

      &:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
    }
  }
`;