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
  justify-content: space-between;
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

