// TopUsers.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store';
import { setUsers } from '../../../store/userSlice';
import User from '../../UserItem';
import { TopUsersContainer } from './styles';

const TopUsers: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <TopUsersContainer>
      <h3>Top Users</h3>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/profile/${user.id}`}>
              <User userName={user.name} postsQuantity={user.postsId.length > 0 ? user.postsId.length : "0"} />
            </Link>
          </li>
        ))}

        <div className="separator"></div>

        <Link to="/profile/1">
          <User userName="You" postsQuantity={10} />
        </Link>
      </ul>
    </TopUsersContainer>
  );
};

export default TopUsers;
