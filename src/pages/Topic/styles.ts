import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  gap: 2rem;

  h1 {
    color: ${props => props.theme.colors.title};
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

export const Answers = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;

  > p {
    color: ${props => props.theme.colors.text};
    text-align: center;
  }
`;