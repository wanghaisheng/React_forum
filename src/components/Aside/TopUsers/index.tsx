import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store';
import { setTopUsers } from '../../../store/userSlice';
import User from '../../UserItem';
import { TopUsersContainer } from './styles';
import { getTopUsers } from '../../../api';
import Spinner from '../../Loading/Spinning';

const TopUsers: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.topUsers);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const topUsers = await getTopUsers();
        dispatch(setTopUsers(topUsers));
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
        {users.map(user => user.id !== currentUser?.id && (
          <Link key={user.id} to={`/profile/${user.id}`}>
            <User userName={user.name} postsQuantity={
              user.postsId.length > 0 ? user.postsId.length : "0"
            } userPhoto={
              user.photoUrl
            } />
          </Link>
        )
        )}

        {currentUser && (
          <>
            <div className="separator"></div>

            <Link to={`/profile/${currentUser.id}`}>
              <User userName={currentUser.name} postsQuantity={currentUser.postsId.length > 0 ? currentUser.postsId.length : "0"} userPhoto={currentUser.photoUrl} />
            </Link>
          </>
        )}
      </ul>
    </TopUsersContainer>
  );
};

export default TopUsers;