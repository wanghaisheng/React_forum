import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8000'; // Altere para a URL do seu servidor

interface Post {
  id: number;
  author: string;
  authorId: number;
  date: string;
  upvotes: number;
  downvotes: number;
  answers: Answer[];
  week: number;
  title: string;
  content: string;
}

interface Answer {
  id: number;
  author: string;
  authorId: number;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

interface User {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  postsId: { id: number }[];
}

interface Week {
  id: number;
  title: string;
  description: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response: AxiosResponse<Post[]> = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const createPost = async (postData: Partial<Post>): Promise<Post> => {
  // Certificar que o campo answers seja um array vazio se não estiver definido
  const completePostData = { ...postData, answers: postData.answers || [] };
  const response: AxiosResponse<Post> = await axios.post(`${API_URL}/posts`, completePostData);
  return response.data;
};

export const getPostById = async (postId: number): Promise<Post> => {
  const response: AxiosResponse<Post> = await axios.get(`${API_URL}/posts/${postId}`);
  return response.data;
};

export const createAnswer = async (postId: number, answerData: Partial<Answer>): Promise<Answer> => {
  // Primeiro, obter os dados do post existente
  const postResponse: AxiosResponse<Post> = await axios.get(`${API_URL}/posts/${postId}`);
  const post = postResponse.data;

  // Garantir que o campo answers seja um array
  const updatedAnswers = [...post.answers, { ...answerData, id: post.answers.length + 1 }]

  // Atualizar o post com o novo array de respostas
  const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, { answers: updatedAnswers });

  // Retornar a resposta recém-adicionada
  const newAnswer = response.data.answers.find((answer: Answer) => answer.content === answerData.content);

  if (!newAnswer) {
    throw new Error('Resposta não encontrada');
  } else {
    return newAnswer;
  }
};

export const getUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(`${API_URL}/users`);
  return response.data;
}

export const getWeeks = async (): Promise<Week[]> => {
  const response: AxiosResponse<Week[]> = await axios.get(`${API_URL}/weeks`);
  return response.data;
}
