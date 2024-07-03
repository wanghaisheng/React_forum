import { styled } from 'styled-components';

export const Container = styled.main`
  a {
    text-decoration: none;
  }

  .no-topics {
    text-align: center;
    margin-top: 2rem;
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