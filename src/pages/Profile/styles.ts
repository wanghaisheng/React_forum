import { styled } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  gap: 2rem;

  a {
    text-decoration: none;
  }
`;

export const ProfileHeader = styled.header`
  display: flex;
  flex-direction: column;
  max-height: fit-content;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary};
  padding-bottom: 3rem;
  border-radius: 4px;

  .photo {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.text};
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }
`;

export const UserPhoto = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
  margin-left: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 3rem;
  background: ${({ theme }) => theme.colors.input};

  div {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.text};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding: 0 2rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.title};
  } 

  p {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  > div {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
  }

  > div > div {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.text};

    span {
      margin-left: 0.5rem;
    }
  }
`;