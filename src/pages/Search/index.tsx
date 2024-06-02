import React from 'react';
import { Container } from "./styles";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Post from '../../components/Post';

function SearchPage() {
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm);
  const posts = useSelector((state: RootState) => state.user.posts);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {searchTerm !== '' ? (
        <>
          <h1>Searches related to: {searchTerm}</h1>
          <p>Results: {filteredPosts.length}</p>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
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
                answerCount={post.answers.length}
              />
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
