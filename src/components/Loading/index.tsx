import Spinner from "./Spinning";
import { Container } from "./styles";

function Loading() {
  return (
    <Container>
      <Spinner />
      <h1>Loading...</h1>
    </Container>
  )
}

export default Loading;
