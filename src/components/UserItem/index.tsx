import { FaArrowUp } from 'react-icons/fa'
import { TopUserContainer } from './styles';

interface TopUserProps {
  userPhoto?: string;
  label?: string;
  userName: string;
  followers?: number;
}

function UserItem({ userPhoto, label, userName, followers }: TopUserProps) {
  console.log(userPhoto);
  return (
    <TopUserContainer>
      <div className='user-info'>
        <div className="user-photo"></div>
        <p>{label} <span>{userName}</span></p>
      </div>

      {followers && (
        <div className='followers-info'>
          <span>{followers}k</span>
          <FaArrowUp size={12} />
        </div>
      )}
    </TopUserContainer>
  )
}

export default UserItem;
