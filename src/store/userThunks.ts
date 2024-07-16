import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCurrentUser } from './userSlice';
import { createUser, getUserById } from '../api';

interface User {
  id: string;
  name: string;
  bio: string;
  createdAt: string;
  postsId: { id: string }[];
}

export const createUserInServer = createAsyncThunk(
  'user/createUserInServer',
  async (userData: User, { dispatch }) => {
    // Primeiro, verificar se o usuário está armazenado no localStorage
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      dispatch(setCurrentUser(user));
      return user;
    }

    try {
      // Verifique se o usuário já existe no servidor
      // const existingUserResponse = await axios.get(`http://localhost:8000/users/${userData.id}`);
      const existingUserResponse = await getUserById(userData.id);

      if (existingUserResponse) {
        // Se o usuário já existir, atualize o estado com as informações existentes
        const existingUser = existingUserResponse;
        dispatch(setCurrentUser(existingUser));
        localStorage.setItem('currentUser', JSON.stringify(existingUser)); // Armazene no localStorage
        return existingUser;
      }
    } catch (error) {
      // Se houver um erro ao verificar o usuário (por exemplo, o usuário não existe), continue para criar o usuário
      if (axios.isAxiosError(error) && error.response?.status !== 404) {
        console.error('Erro ao verificar usuário no servidor:', error);
        throw error;
      }
    }

    // Se o usuário não existir, crie um novo usuário
    try {
      const response = await createUser(userData);
      const createdUser = response;

      dispatch(setCurrentUser(createdUser));
      localStorage.setItem('currentUser', JSON.stringify(createdUser)); // Armazene no localStorage

      return createdUser;
    } catch (error) {
      console.error('Erro ao criar usuário no servidor:', error);
      throw error;
    }
  }
);
