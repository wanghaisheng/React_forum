import { styled } from 'styled-components';

interface StyledFormProps {
  width?: string;
}

export const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: ${({ width }) => width || '100%'};

  h2 {
    color: ${({ theme }) => theme.colors.title};
    font-size: 1.5rem;
    text-align: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const SocialSection = styled.div<StyledFormProps>`
  display: flex;
  width: 100%;
  max-width: ${({ width }) => width || '100%'};
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  .separator {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    div {
      flex: 1;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.text};
    }

    span {
      color: ${({ theme }) => theme.colors.text};
      font-weight: 500;
      font-size: 0.875rem;
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button img {
      width: 25px;
      height: 25px;
    }

    .btnGoogle {
      background-color: ${({ theme }) => theme.colors.title};
      color: ${({ theme }) => theme.colors.primary};
      border: 1px solid ${({ theme }) => theme.colors.primary};
      margin-bottom: 1rem;
    }

    .btnGithub {
      background-color: #333333;
      color: ${({ theme }) => theme.colors.title};
      border: 1px solid #333333;
      margin-bottom: 1rem;
    }
  }
`;

export const BottomLink = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  margin-top: 2rem;

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;