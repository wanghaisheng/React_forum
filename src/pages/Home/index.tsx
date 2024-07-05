import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setPosts } from '../../store/userSlice';
import Post from '../../components/Post';
import { Container } from './styles';
import { getPosts } from '../../api';
import { SkeletonPost } from '../../components/Loading';

import 'react-loading-skeleton/dist/skeleton.css';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.user.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        dispatch(setPosts(posts));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <SkeletonPost quantity={5} />
    );
  }

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
        <p>
          There are no posts to show. Be the first to <Link to="/topics/new-topic">create a post</Link>!
        </p>
      )}
    </Container>
  );
};

export default Home;