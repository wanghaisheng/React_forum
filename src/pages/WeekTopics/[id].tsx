import Post from "../../components/Post";
import data from "../../data/db.json";
import { Link, useParams } from "react-router-dom";
import { Container } from "./styles";

function WeekTopicsPage() {
  const { id } = useParams();
  const weekId = Number(id);

  const weekTopics = data.posts.filter(post => post.week === weekId);

  return (
    <Container>
      <h1>
        Week {id} - Topics
      </h1>

      {weekTopics.length > 0 ? (
        weekTopics.map(post => (
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
        ))
      ) : (
        <h2>
          No topics found for this week.
        </h2>
      )}
    </Container>
  )
}

export default WeekTopicsPage;
