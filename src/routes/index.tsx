import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/appContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setUsers } from '../store/userSlice';
import data from '../data/db.json';
import { User } from '../store/userSlice';

function AppRoutes() {

  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    dispatch(setCurrentUser(currentUser ? JSON.parse(currentUser) : null));
    dispatch(setUsers(data.users as User[]));
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