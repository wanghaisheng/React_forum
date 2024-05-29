import { styled } from 'styled-components';

export const TopUsersContainer = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  background-color: ${props => props.theme.colors.primary};
  border-radius: 4px;

  h3 {
    font-weight: 600;
    color: ${props => props.theme.colors.title};
  }

  .users-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.text};
  }
`;