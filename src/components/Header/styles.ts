import { styled } from 'styled-components';
import Logo from '../../assets/logo';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  > div {
    display: flex;
    max-width: 1500px;
    max-height: 40px;
    width: 100%;
    padding: 0 2rem;
    justify-content: space-between;
    gap: 2rem;

    .search-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30rem;

      &.active {
        outline: 1px solid ${props => props.theme.colors.text};
      }
    }

    .logo {
      align-self: center;
      cursor: pointer;
      transition: 0.2s;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;

      h2 {
          color: ${props => props.theme.colors.title};
          font-size: 1.5rem;
          font-weight: 700;

          span {
            color: ${props => props.theme.colors.secondary};
          }
      }

      &:hover {
        opacity: 0.6;
      }
    }

    .actions-container {
      display: flex;
      gap: 1rem;
      align-items: center;

      a {
        color: ${props => props.theme.colors.input};
        text-decoration: none;
        font-weight: 500;
        transition: 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .actions-container a {
      display: flex;
    }

    .actions-container svg {
      fill: ${props => props.theme.colors.input};
      cursor: pointer;
      transition: 0.2s;
    }

    .actions-container .user-photo {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.2s;
    }

    .actions-container .user-photo:hover, .actions-container svg:hover {  
      opacity: 0.6;
    }
  }

  @media screen and (max-width: 600px) {
    > div .logo h2 {
      display: none;
    }
  }
`;

export const StyledLogo = styled(Logo)`
  width: 2rem;
  height: 2rem;
  align-self: center;
  user-select: none;
  color: ${(props) => props.theme.colors.secondary};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 0.7rem 1rem 0.7rem 0.7rem;
  border-radius: 0 4px 4px 0;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.input};
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;

  :focus {
    border: 1px solid ${(props) => props.theme.colors.input};
  }
`;

export const SearchButton = styled.button`
  height: 100%;
  padding: 0.7rem;
  border-radius: 4px 0 0 4px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.input};
  cursor: pointer;
  transition:  0.2s;

  &:hover {
    opacity: 0.6;
  }
`;