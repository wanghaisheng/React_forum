import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;

  h1 {
    margin: 2rem;
  }
`;

export const WeeksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem 2rem 2rem;

  p {
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    text-decoration: none;
  }
`;

export const WeekBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  transition: 0.2s;

  h2 {
    color: ${({ theme }) => theme.colors.title};
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`;