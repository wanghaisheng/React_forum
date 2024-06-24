import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h1 {
    color: ${props => props.theme.colors.title};
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;