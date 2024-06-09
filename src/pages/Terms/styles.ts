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

export const TermsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;

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
`;