import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;

  > div {
    display: flex;
    max-width: 1500px;
    max-height: 40px;
    width: 100%;
    padding: 0 2rem;
    justify-content: space-between;

    .logo-image {
      width: 2rem;

      svg {
        fill: ${props => props.theme.colors.title};
      
      }

    }

    .search-container {
      display: flex;
      align-items: center;
    }

    .actions-container {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .actions-container svg {
      fill: ${props => props.theme.colors.text};
    }

    .actions-container .user-photo {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

export const SearchInput = styled.input`
  width: 25rem;
  padding: 0.7rem 1rem 0.7rem 0;
  border-radius: 0 4px 4px 0;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;

  :focus{
    outline: none;
  }
`;

export const SearchButton = styled.button`
  height: 100%;
  padding: 0.7rem;
  border-radius: 4px 0 0 4px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
`;