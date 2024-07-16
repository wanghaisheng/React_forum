import { createAsyncThunk } from '@reduxjs/toolkit';
import { upvotePost, downvotePost, Post, Answer, upvoteAnswer, downvoteAnswer } from '../api';
import { upvotePost as upvotePostAction, downvotePost as downvotePostAction, upvoteAnswer as upvoteAnswerAction, downvoteAnswer as downvoteAnswerAction } from './userSlice';
import { AppDispatch, RootState } from '.';

interface VotePayload {
  postId: string;
  answerId?: string;
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
    console.log('updatedPost', updatedPost);
    upvotePostAction(updatedPost);

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
    downvotePostAction(updatedPost);

    return updatedPost;
  }
);

export const upvoteAnswerThunk = createAsyncThunk<Answer, VotePayload, { state: RootState, dispatch: AppDispatch }>(
  'posts/upvoteAnswer',
  async ({ postId, answerId }, { getState }) => {
    const { user } = getState();
    const { currentUser } = user;

    if (!currentUser) {
      throw new Error('User not logged in');
    }

    if (!answerId) {
      throw new Error('Answer ID not provided');
    }

    const [updatedAnswer] = await upvoteAnswer(postId, answerId, currentUser.id);
    upvoteAnswerAction({
      postId, answer:
        updatedAnswer
    });

    return updatedAnswer;
  }
);

export const downvoteAnswerThunk = createAsyncThunk<Answer, VotePayload, { state: RootState, dispatch: AppDispatch }>(
  'posts/downvoteAnswer',
  async ({ postId, answerId }, { getState, dispatch }) => {
    const { user } = getState();
    const { currentUser } = user;

    if (!currentUser) {
      throw new Error('User not logged in');
    }

    if (!answerId) {
      throw new Error('Answer ID not provided');
    }

    const [updatedAnswer] = await downvoteAnswer(postId, answerId, currentUser.id);
    dispatch(downvoteAnswerAction({ postId, answer: updatedAnswer }));

    return updatedAnswer;
  }
);