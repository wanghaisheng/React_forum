import { styled } from 'styled-components';

export const BottomMenuContainer = styled.nav`
  display: none;
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  height: 4rem;
  width: 100%;

  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;

  h1 {
    font-size: 1.6rem;
    color: ${props => props.theme.colors.text};
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;