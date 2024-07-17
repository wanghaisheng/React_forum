import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../services/firebase';
import { getDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

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
  uuid: string;
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
  weekNumber: number;
  title: string;
  description: string;
}
export const getPosts = async (): Promise<Post[]> => {
  // const response: AxiosResponse<Post[]> = await axios.get(`${API_URL}/posts`);
  // Busca todos os posts no Firestore
  const postsCollection = collection(db, 'posts');
  return getDocs(postsCollection).then((querySnapshot) => {
    const posts = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Post;
    });
    return posts;
  }).catch(() => {
    throw new Error('Erro ao buscar os posts');
  });
};

export const createPost = async (postData: Partial<Post>): Promise<Post> => {
  // Certificar que o campo answers seja um array vazio se não estiver definido
  const completePostData = {
    ...postData,
    answers: postData.answers || [],
    author: postData.author ?? '',
    authorId: postData.authorId ?? 'defaultAuthorId',
    upvotes: 0,
    downvotes: 0,
    week: postData.week ?? 1,
    title: postData.title ?? '',
    content: postData.content ?? '',
    date: new Date().toISOString(),
  };
  // const response: AxiosResponse<Post> = await axios.post(`${API_URL}/posts`, completePostData);

  // Adicionar o post ao Firestore
  try {
    const docRef = await addDoc(collection(db, 'posts'), completePostData);
    return { ...completePostData, id: docRef.id };
  } catch (error) {
    throw new Error('Erro ao criar o post');
  }
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const userRef = doc(db, 'users', userData.id!); // Use o ID do usuário como o caminho do documento
    await setDoc(userRef, userData, { merge: true }); // Use setDoc para criar/atualizar o documento

    const createdUserSnapshot = await getDoc(userRef);
    return { id: createdUserSnapshot.id, ...createdUserSnapshot.data() } as User;
  } catch (error) {
    throw new Error('Erro ao criar o usuário');
  }
};

export const getPostById = async (postId: string): Promise<Post> => {
  // const response: AxiosResponse<Post> = await axios.get(`${API_URL}/posts/${postId}`);
  // Busca o post no Firestore
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as Post;
  } else {
    throw new Error('Post não encontrado');
  }
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
  const postResponse = await getPostById(postId);
  const post = postResponse;

  // Garantir que o campo answers seja um array
  const updatedAnswers = [...post.answers, { ...answerData }]

  // Atualizar o post com o novo array de respostas
  // const response: AxiosResponse<Post> = await axios.patch(`${API_URL}/posts/${postId}`, { answers: updatedAnswers });

  // Cria uma nova resposta no Firestore
  const newAnswer = updatedAnswers.find(answer => answer.content === answerData.content) as Answer;

  // Atualiza o post no Firestore
  await setDoc(doc(db, 'posts', postId), { answers: updatedAnswers }, { merge: true });

  return newAnswer;
};

export const getUsers = async (): Promise<User[]> => {
  // const response: AxiosResponse<User[]> = await axios.get(`${API_URL}/users`);
  // Busca todos os usuários no Firestore
  const usersCollection = collection(db, 'users');
  return getDocs(usersCollection).then((querySnapshot) => {
    const users = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as User
    })
    return users
  }).catch(() => {
    throw new Error('Erro ao buscar os usuários')
  });
}

export const getUserById = async (userId: string): Promise<User> => {
  // const response: AxiosResponse<User> = await axios.get(`${API_URL}/users/${userId}`);
  // Busca o usuário no Firestore
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as User;
  } else {
    throw new Error('Usuário não encontrado');
  }
};

export const getTopUsers = async (): Promise<User[]> => {
  // const response: AxiosResponse<User[]> = await axios.get(`${API_URL}/users`);
  const usersCollection = collection(db, 'users');
  const querySnapshot = await getDocs(usersCollection);
  const users = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as User
  });

  // Filtrando e ordenando os usuários no frontend
  // const topUsers = response.data
  //   .sort((a, b) => b.postsId.length - a.postsId.length)
  //   .slice(0, 5);

  const topUsers = users
    .sort((a, b) => b.postsId.length - a.postsId.length)
    .slice(0, 5);

  return topUsers;
}

export const updateUser = async (userId: string, updatedUser: Partial<User>): Promise<User> => {
  // const response = await axios.patch(`${API_URL}/users/${userId}`, updatedUser);
  // Atualiza o usuário no Firestore
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, updatedUser, { merge: true });

  return { ...updatedUser, id: userId } as User;
};

export const updatePost = async (postId: string, updatedPost: Partial<Post>): Promise<Post> => {
  // const response = await axios.patch(`${API_URL}/posts/${postId}`, updatedPost);
  // Atualiza o post no Firestore
  const postRef = doc(db, 'posts', postId);
  await setDoc(postRef, updatedPost, { merge: true });

  return { ...updatedPost, id: postId } as Post;
};

export const updateAnswer = async (postId: string, answerId: string, updatedAnswer: Partial<Answer>): Promise<Answer> => {
  const post = await getPostById(postId);
  const updatedAnswers = post.answers.map(answer => answer.id === answerId ? { ...answer, ...updatedAnswer } : answer);

  // const response = await axios.patch(`${API_URL}/posts/${postId}`, { answers: updatedAnswers });
  // Atualiza o post no Firestore
  const postRef = doc(db, 'posts', postId);
  await setDoc(postRef, { answers: updatedAnswers }, { merge: true });
  // return response.data.answers.find((answer: Answer) => answer.id === answerId);
  return updatedAnswers.find((answer: Answer) => answer.id === answerId) as Answer;
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
    updatedPost = { upvotes: post.upvotes - 1, downvotes: post.downvotes };
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
    updatedPost = { upvotes: post.upvotes + 1, downvotes: post.downvotes };
    updatedUser = {
      votedPosts: [...user.votedPosts, { id: postId, vote: 'up' }]
    };
  }

  // Atualizar o post e o usuário no banco de dados
  const updatedPostResponse = await updatePost(postId, updatedPost);
  const updatedUserResponse = await updateUser(userId, updatedUser);

  console.log('updatedPostResponse', updatedPostResponse);
  console.log('updatedUserResponse', updatedUserResponse);

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
    updatedPost = { downvotes: post.downvotes - 1, upvotes: post.upvotes };
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
    updatedPost = { downvotes: post.downvotes + 1, upvotes: post.upvotes };
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
    updatedAnswer = { upvotes: answer.upvotes - 1, downvotes: answer.downvotes };
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
    updatedAnswer = { upvotes: answer.upvotes + 1, downvotes: answer.downvotes };
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
    updatedAnswer = { downvotes: answer.downvotes - 1, upvotes: answer.upvotes };
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
    updatedAnswer = { downvotes: answer.downvotes + 1, upvotes: answer.upvotes };
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
  // const response: AxiosResponse<Week[]> = await axios.get(`${API_URL}/weeks`);
  // Busca todas as semanas no Firestore
  const weeksCollection = collection(db, 'weeks');
  return getDocs(weeksCollection).then((querySnapshot) => {
    const weeks = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Week
    })
    return weeks
  }).catch(() => {
    throw new Error('Erro ao buscar as semanas')
  });
}