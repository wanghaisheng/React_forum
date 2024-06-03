import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setCurrentPost } from '../../store/userSlice';
import Post from '../../components/Post';
import Answer from '../../components/Answer';
import { Answers, Container } from './styles';
import data from '../../data/db.json';
import NotFoundPage from '../NotFound';

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.user.currentPost);

  useEffect(() => {
    const post = data.posts.find(post => post.id === Number(id));
    dispatch(setCurrentPost(post || null));
  }, [dispatch, id, post]);

  useEffect(() => {
    console.log(post?.answers)
  }, [post]);

  if (!post) {
    return <NotFoundPage />
  }

  return (
    <Container>
      {post ? (
        <>
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
          {post.answers && post.answers.length > 0 && (
            <Answers>
              {post.answers.map((answer) => (
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
            </Answers>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default TopicPage;
