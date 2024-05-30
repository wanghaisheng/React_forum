import { Link } from 'react-router-dom'
import Post from '../../components/Post'
import { Container } from './styles'

export default function Home() {
  return (
    <Container>
      <Link to={"/topics/topic/1"}>
        <Post />
      </Link>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  )
}
