import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setCurrentUser, setCurrentUserPosts } from '../../store/userSlice';
import { Container, ProfileHeader, UserInfo, UserPhoto } from './styles';
import { FaCalendar } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import Post from '../../components/Post';
import data from '../../data/db.json';
import NotFoundPage from '../NotFound';

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const posts = useSelector((state: RootState) => state.user.currentUserPosts);

  useEffect(() => {
    const userId = Number(id);
    const user = data.users.find(user => user.id === userId);
    if (user) {
      dispatch(setCurrentUser(user));
      const userPostIds = user.postsId.map(post => post.id);
      const userPosts = data.posts.filter(post => userPostIds.includes(post.id));
      dispatch(setCurrentUserPosts(userPosts));
    } else {
      dispatch(setCurrentUser(null));
      dispatch(setCurrentUserPosts([]));
    }
  }, [dispatch, id]);

  if (!user) {
    return (
      <NotFoundPage />
    )
  }

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
              <span>{user.postsId.length} topics</span>
            </div>
          </div>
        </UserInfo>
      </ProfileHeader>

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
  );
}

export default ProfilePage;
