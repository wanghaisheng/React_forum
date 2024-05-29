import { styled } from 'styled-components';

export const SideMenuContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 0 2rem 2rem 0;
  margin-bottom: 2rem;
  height: fit-content;
  position: sticky;
  top: 8.5rem;

  .side-menu-content ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;

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

  @media screen and (max-width: 1200px) {
    width: fit-content;

    .side-menu-content ul li span {
      display: none;
    }
  } 

  @media screen and (max-width: 600px) {
    display: none;
  }
`;