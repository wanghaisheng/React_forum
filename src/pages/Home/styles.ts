import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  gap: 2rem;

  h1 {
    color: ${props => props.theme.colors.title};
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  > a {
    text-decoration: none;
    width: 100%;
  }

  > p {
    text-align: center;
    color: ${({ theme }) => theme.colors.text};

    a {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 500;
      transition: 0.2s;
      text-decoration: none;

      &:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
    }
  } 
`;