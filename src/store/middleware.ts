import { Middleware } from '@reduxjs/toolkit';
import { setCurrentUser } from './userSlice';

const persistCurrentUserMiddleware: Middleware = () => next => action => {
  const result = next(action);

  if (setCurrentUser.match(action)) {
    const { payload } = action;
    if (payload) {
      localStorage.setItem('currentUser', JSON.stringify(payload));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  return result;
};

export default persistCurrentUserMiddleware;
