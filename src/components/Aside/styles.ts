import { styled } from 'styled-components';

export const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 30rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  height: fit-content;
  position: sticky;
  top: 8.5rem;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;