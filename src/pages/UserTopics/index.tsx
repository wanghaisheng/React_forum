import { useDispatch, useSelector } from "react-redux";
import { Container } from "./styles";
import { AppDispatch, RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import data from '../../data/db.json';
import { setCurrentUser, setCurrentUserPosts } from "../../store/userSlice";

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
    } else {
      dispatch(setCurrentUser(null));
      dispatch(setCurrentUserPosts([]));
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
      {posts.map(post => (
        <Link key={post.id} to={`/topics/topic/${post.id}`}>
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
      ))}
    </Container>
  )
}

export default UserTopics;
