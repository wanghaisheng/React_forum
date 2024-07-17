import { useDispatch, useSelector } from "react-redux";
import { Container } from "./styles";
import { AppDispatch, RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import { SkeletonPost } from "../../components/Loading";
import { setCurrentUserPosts } from "../../store/userSlice";

function UserTopics() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.users);
  const allPosts = useSelector((state: RootState) => state.user.posts); // Get all posts from the state
  const userPosts = useSelector((state: RootState) => state.user.currentUserPosts);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const foundUser = users.find(user => user.id === currentUser.id);
      if (foundUser) {
        const userPostIds = foundUser.postsId.map(post => post.id);
        const filteredPosts = allPosts.filter(post => userPostIds.includes(post.id));
        dispatch(setCurrentUserPosts(filteredPosts));
      } else {
        dispatch(setCurrentUserPosts([]));
      }
      setLoading(false);
    }
  }, [dispatch, currentUser, users, allPosts]);

  if (!currentUser) {
    navigate('/signin');
    return <main>
      <h1><SkeletonPost quantity={1} /></h1>
    </main>;
  }

  if (loading) {
    return (
      <main>
        <SkeletonPost quantity={1} />
      </main>
    );
  }

  const sortedPosts = userPosts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Container>
      {
        sortedPosts.length > 0 ? (
          sortedPosts.map(post => (
            <Link to={`/topics/topic/${post.id}`} key={post.id}>
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
