import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  
  &#about-container {
    margin-bottom: 0;
  }
`;

export const HelpInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2rem;

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      color: ${({ theme }) => theme.colors.title};
    }

    p {
      color: ${({ theme }) => theme.colors.text};
    }

    a {
      color: ${({ theme }) => theme.colors.text};
      text-decoration: none;
      transition: 0.2s;
      width: fit-content;

      &:hover {
        color: ${({ theme }) => theme.colors.secondary};
        text-decoration: underline;
      }
    }
  } 
`;

export const ListItem = styled.li<{ open: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  padding: 1rem;
  
  cursor: pointer;
  overflow: hidden;

  .answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s, padding 0.3s;
    
    &.visible {
      max-height: 400px;
      padding-top: 2rem;
    }
  }

  &.open {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }

  &:not(.open):hover {
    border: 1px solid ${({ theme }) => theme.colors.text};
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    h3 { 
      color: ${({ theme }) => theme.colors.title};
    }
    
    span {
      color: ${({ theme }) => theme.colors.text};
    }
    
  }

  svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;