import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8000';

export interface Post {
  id: string;
  author: string;
  authorId: string;
  date: string;
  upvotes: number;
  downvotes: number;
  answers: Answer[];
  week: number;
  title: string;
  content: string;
}

interface Answer {
  id: string;
  author: string;
  authorId: string;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

interface User {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  createdAt: string;
  votedPosts: { id: string, vote: 'up' | 'down' }[];
  postsId: { id: string }[];
}

interface Week {
  id: string;
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

export const getPostById = async (postId: string): Promise<Post> => {
  const response: AxiosResponse<Post> = await axios.get(`${API_URL}/posts/${postId}`);
  return response.data;
};

export const createAnswer = async (postId: string, answerData: Partial<Answer>): Promise<Answer> => {
  // Primeiro, obter os dados do post existente
  const postResponse: AxiosResponse<Post> = await axios.get(`${API_URL}/posts/${postId}`);
  const post = postResponse.data;

  // Garantir que o campo answers seja um array
  const updatedAnswers = [...post.answers, { ...answerData }]

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

const getUserById = async (userId: string): Promise<User> => {
  const response: AxiosResponse<User> = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};

export const getTopUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(`${API_URL}/users`);

  // Filtrando e ordenando os usuários no frontend
  const topUsers = response.data
    .sort((a, b) => b.postsId.length - a.postsId.length)
    .slice(0, 5);

  return topUsers;
}

export const updateUser = async (userId: string, updatedUser: Partial<User>): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);
  return response.data;
};

export const upvotePost = async (postId: string, userId: string): Promise<[Post, User]> => {
  const post = await getPostById(postId);
  const user = await getUserById(userId);

  // Verifica se o usuário já votou neste post
  const existingVoteIndex = user.votedPosts.findIndex(vote => vote.id === postId);

  if (existingVoteIndex !== -1) {
    const existingVote = user.votedPosts[existingVoteIndex];

    if (existingVote.vote === 'up') {
      // Remove o voto de up se já votou up novamente
      const updatedPost = { ...post, upvotes: post.upvotes - 1 };
      const updatedUser = { ...user, votedPosts: user.votedPosts.filter(vote => vote.id !== postId) };
      const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
      const response2: AxiosResponse<User> = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);

      return [response.data, response2.data];
    } else {
      // Altera o voto de down para up
      const updatedPost = { ...post, upvotes: post.upvotes + 1, downvotes: post.downvotes - 1 };
      const updatedUser = { ...user, votedPosts: user.votedPosts.map(vote => vote.id === postId ? { id: postId, vote: 'up' } : vote) };
      const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
      const response2: AxiosResponse<User> = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);

      return [response.data, response2.data];
    }
  } else {
    // Vota up pela primeira vez
    const updatedPost = { ...post, upvotes: post.upvotes + 1 };
    const updatedUser = { ...user, votedPosts: [...user.votedPosts, { id: postId, vote: 'up' }] };
    const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
    const response2: AxiosResponse<User> = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);

    return [response.data, response2.data];
  }
};

export const downvotePost = async (postId: string, userId: string): Promise<[Post, User]> => {
  const post = await getPostById(postId);
  const user = await getUserById(userId);

  // Verifica se o usuário já votou neste post
  const existingVoteIndex = user.votedPosts.findIndex(vote => vote.id === postId);

  if (existingVoteIndex !== -1) {
    const existingVote = user.votedPosts[existingVoteIndex];

    if (existingVote.vote === 'down') {
      // Remove o voto de down se já votou down novamente
      const updatedPost = { ...post, downvotes: post.downvotes - 1 };
      const updatedUser = { ...user, votedPosts: user.votedPosts.filter(vote => vote.id !== postId) };
      const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
      const response2: AxiosResponse<User> = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);

      return [response.data, response2.data];
    } else {
      // Altera o voto de up para down
      const updatedPost = { ...post, upvotes: post.upvotes - 1, downvotes: post.downvotes + 1 };
      const updatedUser = { ...user, votedPosts: user.votedPosts.map(vote => vote.id === postId ? { id: postId, vote: 'down' } : vote) };
      const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
      const response2: AxiosResponse<User> = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);

      return [response.data, response2.data];
    }
  } else {
    // Vota down pela primeira vez
    const updatedPost = { ...post, downvotes: post.downvotes + 1 };
    const updatedUser = { ...user, votedPosts: [...user.votedPosts, { id: postId, vote: 'down' }] };
    const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
    const response2: AxiosResponse<User> = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);

    return [response.data, response2.data];
  }
};

export const getWeeks = async (): Promise<Week[]> => {
  const response: AxiosResponse<Week[]> = await axios.get(`${API_URL}/weeks`);
  return response.data;
}
