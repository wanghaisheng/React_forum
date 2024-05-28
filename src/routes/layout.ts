import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const LayoutContainer = styled.div`
  display: flex;
  max-width: 1400px;
  width: 100%;
  height: 100%;
  gap: 4rem;
  justify-content: center;

  main {
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.primary};
  }
`;