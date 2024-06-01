import { Link } from 'react-router-dom';
import notFoundImg from '../../assets/notFound.png'
import Button from '../../components/Button';
import { Container } from './styles';

function NotFoundPage() {
  return (
    <Container>
      <h1>Page not found</h1>
      <img src={notFoundImg} alt="Page not found" />
      <Link to="/">
        <Button variant='neutral'>
          <h4>Go back to home</h4>
        </Button>
      </Link>
    </Container>
  )
}

export default NotFoundPage;
