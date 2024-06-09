import { FaArrowUp } from 'react-icons/fa'
import { TopUserContainer } from './styles';

interface TopUserProps {
  userPhoto?: string;
  label?: string;
  userName: string;
  postsQuantity?: number | string;
}

function UserItem({ userPhoto, label, userName, postsQuantity }: TopUserProps) {
  console.log(userPhoto);
  return (
    <TopUserContainer>
      <div className='user-info'>
        <div className="user-photo"></div>
        <p>{label} <span>{userName}</span></p>
      </div>

      {postsQuantity && (
        <div className='followers-info'>
          <span>{postsQuantity}</span>
          <FaArrowUp size={12} />
        </div>
      )}
    </TopUserContainer>
  )
}

export default UserItem;
