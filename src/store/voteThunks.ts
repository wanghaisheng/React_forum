import { createAsyncThunk } from '@reduxjs/toolkit';
import { upvotePost, downvotePost, Post } from '../api';
import { AppDispatch, RootState } from '.';

interface VotePayload {
  postId: string;
  voteType: 'up' | 'down';
}

export const upvotePostThunk = createAsyncThunk<Post, VotePayload, { state: RootState, dispatch: AppDispatch }>(
  'posts/upvote',
  async ({ postId }, { getState }) => {
    const { user } = getState();
    const { currentUser } = user;

    if (!currentUser) {
      throw new Error('User not logged in');
    }

    const [updatedPost] = await upvotePost(postId, currentUser.id);

    return updatedPost;
  }
);

export const downvotePostThunk = createAsyncThunk<Post, VotePayload, { state: RootState, dispatch: AppDispatch }>(
  'posts/downvote',
  async ({ postId }, { getState }) => {
    const { user } = getState();
    const { currentUser } = user;

    if (!currentUser) {
      throw new Error('User not logged in');
    }

    const [updatedPost] = await downvotePost(postId, currentUser.id);

    return updatedPost;
  }
);
