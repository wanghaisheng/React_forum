import { Container, ProfileHeader, UserInfo, UserPhoto } from "./styles";
import { FaCalendar } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import Post from "../../components/Post";
import { Link, useParams } from "react-router-dom";
import data from "../../data/db.json";

function ProfilePage() {
  const { id } = useParams();
  const userId = Number(id);
  const user = data.users.find(user => user.id === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const userPostIds = user.postsId.map(post => post.id);

  const posts = data.posts.filter(post => userPostIds.includes(post.id));

  return (
    <Container>
      <ProfileHeader>
        <div className="photo">
          <UserPhoto>
            <div></div>
          </UserPhoto>
        </div>
        <UserInfo>
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <div>
            <div>
              <FaCalendar size={14} />
              <span>Joined on {user.createdAt}</span>
            </div>
            <div>
              <FaMessage />
              <span>{userPostIds.length} topics</span>
            </div>
          </div>
        </UserInfo>
      </ProfileHeader>

      {posts.map(post => (
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
  );
}

export default ProfilePage;
