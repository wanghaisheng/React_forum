import { useDispatch, useSelector } from "react-redux";
import { Container } from "./styles";
import { AppDispatch, RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import data from '../../data/db.json';
import { setCurrentUserPosts } from "../../store/userSlice";

function UserTopics() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const posts = useSelector((state: RootState) => state.user.currentUserPosts);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userPostIds = currentUser.postsId.map(post => post.id);
      const userPosts = data.posts.filter(post => userPostIds.includes(post.id));
      console.log(userPosts)
      dispatch(setCurrentUserPosts(userPosts));
    }
    setLoading(false);
  }, [dispatch, currentUser]);

  if (!currentUser) {
    navigate('/signin');
    return null;
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <Container>
      {
        posts.length > 0 ? (
          posts.map(post => (
            <Link to={`/topics/${post.id}`} key={post.id}>
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
          <p className="no-topics">
            You haven't created any topics yet. Click
            <strong><Link to="/topics/new-topic"> here </Link></strong>
            or the create topic button to add a new topic.
          </p>
        )
      }
    </Container>
  )
}

export default UserTopics;