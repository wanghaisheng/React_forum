import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { Week, setPosts } from '../../store/userSlice';
import Post from '../../components/Post';
import { Container } from './styles';
import { SkeletonPost } from '../../components/Loading';
import { getPosts, getWeeks } from '../../api';

const WeekTopicsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.user.posts);
  const [week, setWeek] = useState<Week | undefined>();
  const { id } = useParams();
  const weekId = id;

  useEffect(() => {
    const fetchWeekAndPosts = async () => {
      try {
        const weeks = await getWeeks();
        const week = weeks.find(week => week.id === weekId);

        if (week) {
          setWeek(week);
          const allPosts = await getPosts();
          const weekPosts = allPosts.filter(post => post.week === week.weekNumber);
          dispatch(setPosts(weekPosts));
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekAndPosts();
  }, [dispatch, weekId]);

  if (loading) {
    return (
      <Container>
        {week && <h1>Week {week.weekNumber} topics</h1>}
        <SkeletonPost quantity={1} />
      </Container>
    );
  }

  if (!week) {
    return (
      <Container>
        <h1 className='week-not-found'>Week not found</h1>
      </Container>
    );
  }

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Container>
      {week && <h1>Week {week.weekNumber} topics</h1>}

      {sortedPosts.length > 0 ? (
        sortedPosts.map(post => (
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
        ))
      ) : (
        <p>There are no topics yet this week.</p>
      )}
    </Container>
  );
};

export default WeekTopicsPage;
