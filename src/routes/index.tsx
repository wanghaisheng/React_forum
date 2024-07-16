import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/appContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setPosts, setUsers } from '../store/userSlice';
import { getPosts, getUsers } from '../api';

function AppRoutes() {

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const currentUser = localStorage.getItem('currentUser');
      const allUsers = await getUsers();
      const allPosts = await getPosts();
      localStorage.setItem('users', JSON.stringify(allUsers));
      localStorage.setItem('posts', JSON.stringify(allPosts));
      dispatch(setCurrentUser(currentUser ? JSON.parse(currentUser) : null));
      dispatch(setUsers(
        JSON.parse(localStorage.getItem('users') ?? '[]')
      ));
      dispatch(setPosts(
        JSON.parse(localStorage.getItem('posts') ?? '[]')
      ));
    }
    fetchData();
  }, [
    dispatch
  ]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default AppRoutes;