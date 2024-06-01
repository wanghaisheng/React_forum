import Post from "../../components/Post";
import Answer from "../../components/Answer";
import { Answers, Container } from "./styles";

import { useParams } from "react-router-dom";

import data from "../../data/db.json";

function TopicPage() {
  const { id } = useParams<{ id: string }>();

  const post = data.posts.find(post => post.id === Number(id));

  return (
    <Container>
      {post && (
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
      )}

      {post && post?.answers && post.answers.length > 0 && (
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
    </Container>
  )
}

export default TopicPage;
