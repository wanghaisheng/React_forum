import { styled } from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 1fr;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

export const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;

  h2 {
    color: ${({ theme }) => theme.colors.title};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  > div section, section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      text-decoration: underline;
    }
  
  }
`;

export const HeroImage = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`;