import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setPosts } from '../../store/userSlice';
import Post from '../../components/Post';
import { Container } from './styles';
import { getPosts } from '../../api';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.user.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      dispatch(setPosts(posts));
    }
    fetchPosts();
  }, [dispatch]);

  return (
    <Container>
      {posts.length > 0 ? (
        posts.map(post => (
          <Link key={post.id} to={`/topics/topic/${post.id}`}>
            <Post
              id={post.id}
              author={post.author}
              authorId={post.authorId}
              date={post.date}
              week={post.week}
              title={post.title}
              content={post.content}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              answerCount={post.answers.length}
            />
          </Link>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default Home;
