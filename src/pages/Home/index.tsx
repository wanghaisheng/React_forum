import { Link } from 'react-router-dom'
import Post from '../../components/Post'
import { Container } from './styles'

import data from '../../data/db.json'

export default function Home() {
  return (
    <Container>
      {data.posts.map(post => (
        <Link to={`/topics/topic/${post.id}`}>
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
        </Link>
      ))}
    </Container>
  )
}
