import { styled } from 'styled-components';

export const UserItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    p {
      font-size: 0.9rem;
      color: ${props => props.theme.colors.text};
    }

    span {
      font-weight: 600;
      color: ${props => props.theme.colors.secondary};
    }

    .user-photo {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: #ccc;
    }
  }

  .followers-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-weight: 600;
      font-size: 0.75rem;
      color: ${props => props.theme.colors.text};
    }

    svg {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;