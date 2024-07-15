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

export interface Answer {
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
  votedAnswers: { postId: string, answerId: string, vote: 'up' | 'down' }[];
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

export const getAnswerById = async (postId: string, answerId: string): Promise<Answer> => {
  const post = await getPostById(postId);
  const answer = post.answers.find(answer => answer.id === answerId);

  if (!answer) {
    throw new Error('Resposta não encontrada');
  } else {
    return answer;
  }
}

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

export const updatePost = async (postId: string, updatedPost: Partial<Post>): Promise<Post> => {
  const response = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
  return response.data;
};

export const updateAnswer = async (postId: string, answerId: string, updatedAnswer: Partial<Answer>): Promise<Answer> => {
  const post = await getPostById(postId);
  const updatedAnswers = post.answers.map(answer => answer.id === answerId ? { ...answer, ...updatedAnswer } : answer);

  const response = await axios.patch(`${API_URL}/posts/${postId}`, { answers: updatedAnswers });
  return response.data.answers.find((answer: Answer) => answer.id === answerId);
};

export const upvotePost = async (postId: string, userId: string): Promise<[Post, User]> => {
  const post = await getPostById(postId);
  const user = await getUserById(userId);

  // Verificar se o usuário já votou neste post
  const userVotedPost = user.votedPosts.find(votedPost => votedPost.id === postId);

  let updatedPost: Partial<Post>;
  let updatedUser: Partial<User>;

  // Se o usuário já votou no post como upvote, remover o voto
  if (userVotedPost && userVotedPost.vote === 'up') {
    updatedPost = { upvotes: post.upvotes - 1 };
    updatedUser = {
      votedPosts: user.votedPosts.filter(votedPost => votedPost.id !== postId)
    };
  }
  // Se o usuário já votou no post como downvote, atualizar para upvote
  else if (userVotedPost && userVotedPost.vote === 'down') {
    updatedPost = { upvotes: post.upvotes + 1, downvotes: post.downvotes - 1 };
    updatedUser = {
      votedPosts: user.votedPosts.map(votedPost => votedPost.id === postId ? { id: postId, vote: 'up' } : votedPost)
    };
  }
  // Se o usuário ainda não votou no post, adicionar um voto de upvote
  else {
    updatedPost = { upvotes: post.upvotes + 1 };
    updatedUser = {
      votedPosts: [...user.votedPosts, { id: postId, vote: 'up' }]
    };
  }

  // Atualizar o post e o usuário no banco de dados
  const updatedPostResponse = await updatePost(postId, updatedPost);
  const updatedUserResponse = await updateUser(userId, updatedUser);

  return [updatedPostResponse, updatedUserResponse];
};

export const downvotePost = async (postId: string, userId: string): Promise<[Post, User]> => {
  const post = await getPostById(postId);
  const user = await getUserById(userId);

  // Verificar se o usuário já votou neste post
  const userVotedPost = user.votedPosts.find(votedPost => votedPost.id === postId);

  let updatedPost: Partial<Post>;
  let updatedUser: Partial<User>;

  // Se o usuário já votou no post como downvote, remover o voto
  if (userVotedPost && userVotedPost.vote === 'down') {
    updatedPost = { downvotes: post.downvotes - 1 };
    updatedUser = {
      votedPosts: user.votedPosts.filter(votedPost => votedPost.id !== postId)
    };
  }
  // Se o usuário já votou no post como upvote, atualizar para downvote
  else if (userVotedPost && userVotedPost.vote === 'up') {
    updatedPost = { upvotes: post.upvotes - 1, downvotes: post.downvotes + 1 };
    updatedUser = {
      votedPosts: user.votedPosts.map(votedPost => votedPost.id === postId ? { id: postId, vote: 'down' } : votedPost)
    };
  }
  // Se o usuário ainda não votou no post, adicionar um voto de downvote
  else {
    updatedPost = { downvotes: post.downvotes + 1 };
    updatedUser = {
      votedPosts: [...user.votedPosts, { id: postId, vote: 'down' }]
    };
  }

  // Atualizar o post e o usuário no banco de dados
  const updatedPostResponse = await updatePost(postId, updatedPost);
  const updatedUserResponse = await updateUser(userId, updatedUser);

  return [updatedPostResponse, updatedUserResponse];
};

export const upvoteAnswer = async (postId: string, answerId: string, userId: string): Promise<[Answer, User]> => {
  const answer = await getAnswerById(postId, answerId);
  const user = await getUserById(userId);

  // Verificar se o usuário já votou nesta resposta
  const userVotedAnswer = user.votedAnswers.find(votedAnswer => votedAnswer.answerId === answerId);

  let updatedAnswer: Partial<Answer>;
  let updatedUser: Partial<User>;

  // Se o usuário já votou na resposta como upvote, remover o voto
  if (userVotedAnswer && userVotedAnswer.vote === 'up') {
    updatedAnswer = { upvotes: answer.upvotes - 1 };
    updatedUser = {
      votedAnswers: user.votedAnswers.filter(votedAnswer => votedAnswer.answerId !== answerId)
    };
  }

  // Se o usuário já votou na resposta como downvote, atualizar para upvote
  else if (userVotedAnswer && userVotedAnswer.vote === 'down') {
    updatedAnswer = { upvotes: answer.upvotes + 1, downvotes: answer.downvotes - 1 };
    updatedUser = {
      votedAnswers: user.votedAnswers.map(votedAnswer => votedAnswer.answerId === answerId ? { postId, answerId, vote: 'up' } : votedAnswer)
    };
  }

  // Se o usuário ainda não votou na resposta, adicionar um voto de upvote
  else {
    updatedAnswer = { upvotes: answer.upvotes + 1 };
    updatedUser = {
      votedAnswers: [...user.votedAnswers, { postId, answerId, vote: 'up' }]
    };
  }

  // Atualizar a resposta e o usuário no banco de dados
  const updatedAnswerResponse = await updateAnswer(postId, answerId, updatedAnswer);
  const updatedUserResponse = await updateUser(userId, updatedUser);

  return [updatedAnswerResponse, updatedUserResponse];
}

export const downvoteAnswer = async (postId: string, answerId: string, userId: string): Promise<[Answer, User]> => {
  const answer = await getAnswerById(postId, answerId);
  const user = await getUserById(userId);

  // Verificar se o usuário já votou nesta resposta
  const userVotedAnswer = user.votedAnswers.find(votedAnswer => votedAnswer.answerId === answerId);

  let updatedAnswer: Partial<Answer>;
  let updatedUser: Partial<User>;

  // Se o usuário já votou na resposta como downvote, remover o voto

  if (userVotedAnswer && userVotedAnswer.vote === 'down') {
    updatedAnswer = { downvotes: answer.downvotes - 1 };
    updatedUser = {
      votedAnswers: user.votedAnswers.filter(votedAnswer => votedAnswer.answerId !== answerId)
    };
  }

  // Se o usuário já votou na resposta como upvote, atualizar para downvote
  else if (userVotedAnswer && userVotedAnswer.vote === 'up') {
    updatedAnswer = { upvotes: answer.upvotes - 1, downvotes: answer.downvotes + 1 };
    updatedUser = {
      votedAnswers: user.votedAnswers.map(votedAnswer => votedAnswer.answerId === answerId ? { postId, answerId, vote: 'down' } : votedAnswer)
    };
  }

  // Se o usuário ainda não votou na resposta, adicionar um voto de downvote
  else {
    updatedAnswer = { downvotes: answer.downvotes + 1 };
    updatedUser = {
      votedAnswers: [...user.votedAnswers, { postId, answerId, vote: 'down' }]
    };
  }

  // Atualizar a resposta e o usuário no banco de dados

  const updatedAnswerResponse = await updateAnswer(postId, answerId, updatedAnswer);
  const updatedUserResponse = await updateUser(userId, updatedUser);

  return [updatedAnswerResponse, updatedUserResponse];
}

export const getWeeks = async (): Promise<Week[]> => {
  const response: AxiosResponse<Week[]> = await axios.get(`${API_URL}/weeks`);
  return response.data;
}