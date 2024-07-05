import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setCurrentPost } from '../../store/userSlice';

import { getPostById } from '../../api';

import Post from '../../components/Post';
import Answer from '../../components/Answer';
import NotFoundPage from '../NotFound';

import { Answers, Container } from './styles';
import { SkeletonPost } from '../../components/Loading';
interface Answer {
  id: string;
  author: string;
  authorId: string;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.user.currentPost);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const post = await getPostById(id);
          dispatch(setCurrentPost(post));
          if (answers.length === 0) {
            setAnswers(post.answers);
          }
        }
      } catch (error) {
        console.error(error);
        dispatch(setCurrentPost(null));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [dispatch, id, answers.length]);

  if (isLoading) {
    return (
      <main>
        <SkeletonPost quantity={1} />
      </main>
    )
  }

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <Container>
      <Post
        key={post.id}
        id={post.id}
        author={post.author}
        authorId={post.authorId}
        date={post.date}
        week={post.week}
        title={post.title}
        content={post.content}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        answerCount={post.answers ? post.answers.length : 0}
        actions
      />
      <Answers>
        {post.answers && post.answers.map((answer) => (
          <Answer
            key={answer.id}
            id={answer.id}
            author={answer.author}
            authorId={answer.authorId}
            date={answer.date}
            content={answer.content}
            upvotes={answer.upvotes}
            downvotes={answer.downvotes}
          />
        ))}
        {post.answers && post.answers.length === 0 && (
          <p>This topic still doesn't have any answers. Be the first to answer!</p>
        )}
      </Answers>
    </Container>
  );
};

export default TopicPage;
