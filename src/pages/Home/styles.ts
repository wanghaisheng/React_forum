import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  width: 100%;

  h1 {
    color: ${props => props.theme.colors.title};
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;