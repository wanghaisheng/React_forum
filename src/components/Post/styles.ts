import { styled } from 'styled-components';

export const PostContainer = styled.article`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 2rem;
  gap: 3rem;

  cursor: pointer;

  .post {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    h1 {
      color: ${props => props.theme.colors.title};
      font-size: ${props => props.theme.fontSizes['xl']};
    }

    .separator {
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.colors.text};
    }
  }

  &:hover {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary};
  }

  @media screen and (max-width: 1200px) {
    padding: 1rem;
  }
`;

export const PostVotes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    svg {
      transition: 0.2s;
    }

    &:hover svg {
      transform: scale(1.3);

      &.up-vote {
        color: ${props => props.theme.colors.secondary};
      }

      &.down-vote {
        color: ${props => props.theme.colors.danger};
      }
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

export const PostHeader = styled.header`
  display: flex;
  align-items: center;

  > span {
    color: ${props => props.theme.colors.text};
    font-size: 0.9rem;
  }

  > span::before {
    content: '•';
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.text};
  }
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    color: ${props => props.theme.colors.text};
    line-height: 2;
  }
`;

export const PostFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  > div {
    display: flex;
    justify-content: space-between;

    &.no-actions {
      justify-content: flex-end;
    }
  }
`

export const PostActions = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  button {
    min-width: fit-content;

    &:first-child {
      color: ${props => props.theme.colors.secondary};
      border-color: ${props => props.theme.colors.secondary};
    }
  }
`

export const PostMetaData = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  span, svg {
    color: ${props => props.theme.colors.text};
  }
`

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    width: 100%;
    min-height: 5rem;
    flex: 1;
    padding: 0.7rem;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.input};
    outline: none;
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    resize: none;

    &.active:focus {
      border: 1px solid ${(props) => props.theme.colors.input};
    }
  }

  .answer-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
  
    button {
      max-width: 8rem;
    }
  }
`;
