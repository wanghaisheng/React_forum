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
    width: 100%;
    text-decoration: none;
  }
`;