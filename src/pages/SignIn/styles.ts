import { styled } from 'styled-components';
import Logo from '../../assets/logo';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.primary};
  padding: 2rem;
  gap: 2rem;
`;

export const HeroTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h2 {
    color: ${props => props.theme.colors.title};

    &:first-child {
      font-size: 1.5rem;
    }

    &:last-child {
      font-size: 2rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
`;

export const StyledLogo = styled(Logo)`
  width: 2rem;
  height: 2rem;
  align-self: center;
  user-select: none;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Description = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;
  text-align: center;
`;
