import { styled } from 'styled-components';

export const AsideLinksContainer = styled.nav`
  display: flex;
  justify-content: space-between;

  background-color: ${props => props.theme.colors.primary};
  padding: 1rem;
  border-radius: 4px;

  .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${props => props.theme.colors.secondary};
      text-decoration: underline;
    }
  }
`