import Skeleton from 'react-loading-skeleton';
import { styled } from 'styled-components';

export const SkeletonPostBody = styled.div`
  width: 100%;
  height: 265px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 4px;
  margin-bottom: 2rem;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .header {
    width: 100%;
    height: 26px;
  }

  .title {
    width: 50%;
    height: 26px;
  }

  .content {
    width: 100%;
    height: 26px;
  }

  > div {
    margin-left: auto;
    width: 20%;
    height: 26px;
    
    .footer {
      height: 26px;
    }
  }
`;

export const SkeletonWeekBody = styled.div`
  height: 98px;
  margin: 0 2rem 1rem 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;

  .header {
    width: 30%;
    height: 19px;
  }

  .title {
    width: 50%;
    height: 19px;
  }

  .content {
    width: 100%;
    height: 19px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SkeletonTopUsersBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .photo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .content {
    flex: 1;
    height: 24px;
  }
  
  span {
    width: 100%;
    height: 24px;
  }
`;

export const SkeletonAvatarBody = styled.div`
  display: flex;
  align-items: center;
`;

export const SkeletonText = styled(Skeleton)`
  border-radius: 4px;
`;

