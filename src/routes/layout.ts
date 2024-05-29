import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  margin-top: 4rem;
`;

export const LayoutContainer = styled.div`
  display: flex;
  max-width: 1500px;
  width: 100%;
  height: 100%;
  gap: 4rem;
  justify-content: center;
  padding: 0 2rem;

  main {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
  }

  @media screen and (max-width: 1200px) {
    gap: 2rem;
  }
`;