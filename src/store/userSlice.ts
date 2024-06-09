import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Answer {
  id: number;
  author: string;
  authorId: number;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

interface Post {
  id: number;
  author: string;
  authorId: number;
  date: string;
  week: number;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  answers: Answer[];
}

interface User {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  postsId: { id: number }[];
}

interface UserState {
  posts: Post[];
  currentPost: Post | null;
  currentUser: User | null;
  currentUserPosts: Post[];
  searchTerm: string;
  users: User[];
}

const initialState: UserState = {
  posts: [],
  currentPost: null,
  currentUser: null,
  currentUserPosts: [],
  searchTerm: '',
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
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
    addAnswer: (state, action: PayloadAction<{ postId: number, answer: Answer }>) => {
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
  },
});

export const { setPosts, setCurrentPost, setCurrentUser, setCurrentUserPosts, setSearchTerm, addAnswer, setUsers } = userSlice.actions;

export default userSlice.reducer;