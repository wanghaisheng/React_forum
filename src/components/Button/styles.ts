import { styled } from "styled-components";

export const ButtonContainer = styled.button`
    flex: 1;
    width: 100%;
    padding: 0.8rem;
    color: white;
    border-radius: 4px;
    font-family: "Roboto", sans-serif;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: 0.2s;
    cursor: pointer;

    background-color: ${({ theme, className }) => {
    switch (className) {
      case 'cancel':
        return theme.colors.danger;
      case 'confirm':
        return theme.colors.confirm;
      case 'neutral':
        return theme.colors.secondary;
      default:
        return 'transparent';
    }
  }};

    border: ${({ theme, className }) => {
    switch (className) {
      case 'transparent':
        return `1px solid ${theme.colors.text}`;
      default:
        return 'none';
    }
  }};

    &:hover {
        opacity: 0.8;
    }
`;