import { styled } from 'styled-components';

export const StyledInput = styled.input`
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
`;

export const StyledLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;