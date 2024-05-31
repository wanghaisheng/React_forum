import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  gap: 2rem;

  h1 {
    margin: 2rem 0 0 2rem;
  }
`;

export const NewTopicForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem;
  gap: 1rem;

  div:not(:last-child) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text};
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.7rem;
      border-radius: 4px;
      border: 1px solid ${({ theme }) => theme.colors.text};
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.input};
      outline: none;
      font-family: 'Roboto', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;

      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.input};
      }
    }

    textarea {
      min-height: 10rem;
      flex: 1;
      resize: none;
    }
  }

  button {
    margin-top: 1rem;
  }
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
