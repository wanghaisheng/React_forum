import { styled } from 'styled-components';

export const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30rem;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;