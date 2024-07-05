import { useEffect, useState } from 'react';
import { Container } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Post from '../../components/Post';
import { SkeletonPost } from '../../components/Loading'; // Certifique-se de importar o SkeletonPost corretamente
import { Link } from 'react-router-dom';
import { getPosts } from '../../api';
import { setPosts } from '../../store/userSlice';

function SearchPage() {
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm);
  const posts = useSelector((state: RootState) => state.user.posts);
  const dispatch = useDispatch<AppDispatch>();

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        dispatch(setPosts(posts));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
    setLoading(false);

    console.log(posts);
  }, [searchTerm]);

  return (
    <Container>
      {loading ? (
        <SkeletonPost quantity={1} />
      ) : searchTerm !== '' ? (
        <>
          <p>Results: {filteredPosts.length}</p>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
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
            <h2>No posts found</h2>
          )}
        </>
      ) : (
        <h1>Search for something...</h1>
      )}
    </Container>
  );
}

export default SearchPage;