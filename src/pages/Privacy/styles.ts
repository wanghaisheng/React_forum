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

export const PrivacyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h2 {
    color: ${({ theme }) => theme.colors.title};
  }

  p {
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    list-style-type: upper-alpha;
    padding-left: 1rem;

    li {
      color: ${({ theme }) => theme.colors.text};
    }

    li + li {
      margin-top: 0.5rem;
    }
  }
`;