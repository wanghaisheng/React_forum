import { styled } from 'styled-components';

export const AnswerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 4px;
  padding: 2rem;
  gap: 3rem;

  cursor: pointer;

  .answer {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  &:hover {
    border: 1px solid ${props => props.theme.colors.input};
  }

  @media screen and (max-width: 1200px) {
    padding: 1rem;
  }
`;

export const AnswerVotes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  > button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
      transition: 0.2s;
    }

    &.voted .up-vote {
      color: ${props => props.theme.colors.secondary};
    }

    &.voted .down-vote {
      color: ${props => props.theme.colors.danger};
    }

    &:not(:disabled):hover svg {
      transform: scale(1.3);

      &.up-vote {
        color: ${props => props.theme.colors.secondary};
      }

      &.down-vote {
        color: ${props => props.theme.colors.danger};
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  span {
    color: ${props => props.theme.colors.text};
    font-weight: 600;
  }

  svg {
    color: ${props => props.theme.colors.text};
  }
`;

export const AnswerHeader = styled.header`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    a {
      transition: 0.2s;
      text-decoration: none;
      color: ${props => props.theme.colors.secondary};
    }

    a:hover {
      text-decoration: underline;
      opacity: 0.9;
    }
  }

  > div > span {
    color: ${props => props.theme.colors.text};
    font-size: 0.9rem;
  }

  > div > span::before {
    content: '•';
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.text};
  }
`;

export const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    color: ${props => props.theme.colors.text};
    line-height: 2;
  }
`;