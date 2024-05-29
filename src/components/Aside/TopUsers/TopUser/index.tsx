import { FaArrowUp } from 'react-icons/fa'
import { TopUserContainer } from './styles';

interface TopUserProps {
  userPhoto?: string;
  userName: string;
  followers: number;
}

function TopUser({ userPhoto, userName, followers }: TopUserProps) {
  return (
    <TopUserContainer>
      <div className='user-info'>
        <div className="user-photo"></div>
        <p>{userName}</p>
      </div>

      <div className='followers-info'>
        <span>{followers}k</span>
        <FaArrowUp size={14} />
      </div>
    </TopUserContainer>
  )
}

export default TopUser;
