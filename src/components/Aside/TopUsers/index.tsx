import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store';
import { setUsers } from '../../../store/userSlice';
import User from '../../UserItem';
import { TopUsersContainer } from './styles';
import { getUsers } from '../../../api';
import Spinner from '../../Loading/Spinning';

const TopUsers: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        dispatch(setUsers(users));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

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