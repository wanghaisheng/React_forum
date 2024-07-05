import { SkeletonTheme } from "react-loading-skeleton";
import { SkeletonAvatarBody, SkeletonPostBody, SkeletonText, SkeletonTopUsersBody, SkeletonWeekBody } from "./styles";

interface SkeletonPostProps {
  quantity: number;
}

export function SkeletonPost({ quantity }: SkeletonPostProps) {
  return (
    <SkeletonTheme baseColor="#444" highlightColor="#777">
      <main>
        {[...Array(quantity)].map((_, index) => (
          <SkeletonPostBody key={index}>
            <SkeletonText className='header' />
            <SkeletonText className='title' />
            <SkeletonText className='content' />
            <div>
              <SkeletonText className='footer' />
            </div>
          </SkeletonPostBody>
        ))}
      </main>
    </SkeletonTheme>
  )
}

export function SkeletonWeek() {
  return (
    <SkeletonTheme baseColor="#444" highlightColor="#777">
      {[...Array(10)].map((_, index) => (
        <SkeletonWeekBody key={index}>
          <div>
            <SkeletonText className='title' />
            <SkeletonText className='content' />
          </div>
        </SkeletonWeekBody>
      ))}
    </SkeletonTheme>
  )
}

export function SkeletonTopUsers() {
  return (
    <SkeletonTheme baseColor="#444" highlightColor="#777">
      {[...Array(5)].map((_, index) => (
        <SkeletonTopUsersBody key={index}>
          <div className="photo">
            <SkeletonText circle />
          </div>
          <div className="content">
            <SkeletonText />
          </div>
        </SkeletonTopUsersBody>
      ))}
    </SkeletonTheme>
  );
}

export function SkeletonAvatar() {
  return (
    <SkeletonTheme baseColor="#444" highlightColor="#777">
      <SkeletonAvatarBody>
        <SkeletonText circle height={32} width={32} />
      </SkeletonAvatarBody>
    </SkeletonTheme>
  );
}