import { FaArrowUp } from 'react-icons/fa'
import { UserItemContainer } from './styles';

interface TopUserProps {
  userPhoto: string;
  label?: string;
  userName: string;
  postsQuantity?: number | string;
}

function UserItem({ userPhoto, label, userName, postsQuantity }: TopUserProps) {
  return (
    <UserItemContainer>
      <div className='user-info'>
        {userPhoto ? (
          <img src={userPhoto} alt={userName} className="user-photo" referrerPolicy="no-referrer" />
        ) : (
          <div className="user-without-photo" />
        )}

        <p>{label} <span>{userName}</span></p>
      </div>

      {postsQuantity && (
        <div className='followers-info'>
          <span>{postsQuantity}</span>
          <FaArrowUp size={12} />
        </div>
      )}
    </UserItemContainer>
  )
}

export default UserItem;
