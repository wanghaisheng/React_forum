import Post from "../../components/Post";
import Answer from "../../components/Answer";
import { Answers, Container } from "./styles";

function TopicPage() {
  return (
    <Container>
      <Post actions />

      <Answers>
        <Answer />
        <Answer />
        <Answer />
        <Answer />
      </Answers>
    </Container>
  )
}

export default TopicPage;
