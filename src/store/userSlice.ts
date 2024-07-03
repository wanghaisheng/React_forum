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

interface Post {
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
}

interface User {
  id: string;
  name: string;
  bio: string;
  createdAt: string;
  postsId: { id: string }[];
}

interface UserState {
  posts: Post[];
  currentPost: Post | null;
  currentUser: User | null;
  currentUserPosts: Post[];
  searchTerm: string;
  users: User[];
  topUsers: User[];
}

const initialState: UserState = {
  posts: [],
  currentPost: null,
  currentUser: null,
  currentUserPosts: [],
  searchTerm: '',
  users: [],
  topUsers: [],
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
    addAnswer: (state, action: PayloadAction<{ postId: string, answer: Answer }>) => {
      const { postId, answer } = action.payload;
      console.log('Adding answer:', answer, 'to post:', postId)
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
    }
  },
});

export const { setPosts, setCurrentPost, setCurrentUser, setCurrentUserPosts, setSearchTerm, addAnswer, setUsers, setTopUsers } = userSlice.actions;

export default userSlice.reducer;