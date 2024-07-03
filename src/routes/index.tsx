import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/appContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/userSlice';

function AppRoutes() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    dispatch(setCurrentUser(currentUser ? JSON.parse(currentUser) : null));
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