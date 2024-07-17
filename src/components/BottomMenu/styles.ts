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

  .bottom-menu-content ul {
    list-style: none;
    display: flex;
    gap: 1rem;

    a {
      text-decoration: none;
    }

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      cursor: pointer;

      svg, span {
        color: ${props => props.theme.colors.title};
      }

      span {
        font-weight: 600;
      }
    }

    li.active {
      background-color: ${props => props.theme.colors.tertiary};
      border-radius: 4px;

      svg, span {
        color: ${props => props.theme.colors.secondary};
      
      }
    }

    li:not(.active):hover {
      svg, span {
        color: ${props => props.theme.colors.tertiary};
      }
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;