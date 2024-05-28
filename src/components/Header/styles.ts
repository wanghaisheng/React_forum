import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;

  div {
    display: flex;
    max-width: 1400px;
    width: 100%;
  }
`;