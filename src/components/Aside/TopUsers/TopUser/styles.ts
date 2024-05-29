import { styled } from 'styled-components';

export const TopUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    p {
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
      font-size: 0.9rem;
      color: ${props => props.theme.colors.text};
    }

    svg {
      color: #00a2ff;
    }
  }
`;