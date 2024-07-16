import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/appContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setUsers } from '../store/userSlice';
import { getUsers } from '../api';

function AppRoutes() {

  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    dispatch(setCurrentUser(currentUser ? JSON.parse(currentUser) : null));

    const fetchUsers = async () => {
      const users = await getUsers();
      dispatch(setUsers(users));
    };
    fetchUsers();
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