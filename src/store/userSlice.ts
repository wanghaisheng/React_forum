import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Answer {
  id: string;
  author: string;
  authorId: string;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

export interface Post {
  id: string;
  author: string;
  authorId: string;
  date: string;
  week: number;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  answers: Answer[];
  actions?: boolean;
}

export interface User {
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

export interface Week {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
}

interface UserState {
  posts: Post[];
  currentPost: Post | null;
  currentUser: User | null;
  currentUserPosts: Post[];
  searchTerm: string;
  users: User[];
  topUsers: User[];
  weeks: Week[];
}

const initialState: UserState = {
  posts: [],
  currentPost: null,
  currentUser: null,
  currentUserPosts: [],
  searchTerm: '',
  users: [],
  topUsers: [],
  weeks: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setWeeks: (state, action: PayloadAction<Week[]>) => {
      state.weeks = action.payload;
    },

    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setCurrentUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.currentUserPosts = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    addAnswer: (state, action: PayloadAction<{ postId: string, answer: Answer }>) => {
      const { postId, answer } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].answers.push(answer);
      }

      if (state.currentPost && state.currentPost.id === postId) {
        state.currentPost.answers.push(answer);
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setTopUsers: (state, action: PayloadAction<User[]>) => {
      state.topUsers = action.payload;
    },
    upvotePost(state, action: PayloadAction<Post>) {
      const updatedPosts = state.posts.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
      return { ...state, posts: updatedPosts, currentPost: action.payload };
    },

    downvotePost(state, action: PayloadAction<Post>) {
      const updatedPosts = state.posts.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
      return { ...state, posts: updatedPosts, currentPost: action.payload };
    },

    upvoteAnswer: (state, action: PayloadAction<{ postId: string, answer: Answer }>) => {
      const { postId, answer } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        const updatedAnswers = state.posts[postIndex].answers.map(ans =>
          ans.id === answer.id ? answer : ans
        );
        state.posts[postIndex].answers = updatedAnswers;
      }

      if (state.currentPost && state.currentPost.id === postId) {
        const updatedAnswers = state.currentPost.answers.map(ans =>
          ans.id === answer.id ? answer : ans
        );
        state.currentPost.answers = updatedAnswers;
      }
    },
    downvoteAnswer: (state, action: PayloadAction<{ postId: string, answer: Answer }>) => {
      const { postId, answer } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        const updatedAnswers = state.posts[postIndex].answers.map(ans =>
          ans.id === answer.id ? answer : ans
        );
        state.posts[postIndex].answers = updatedAnswers;
      }

      if (state.currentPost && state.currentPost.id === postId) {
        const updatedAnswers = state.currentPost.answers.map(ans =>
          ans.id === answer.id ? answer : ans
        );
        state.currentPost.answers = updatedAnswers;
      }
    },
  },
});

export const { setPosts, setCurrentPost, setCurrentUser, setCurrentUserPosts, setSearchTerm, addAnswer, setUsers, setTopUsers, upvotePost, downvotePost, upvoteAnswer, downvoteAnswer, setWeeks } = userSlice.actions;

export default userSlice.reducer;