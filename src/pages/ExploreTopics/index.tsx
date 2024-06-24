import { Link } from "react-router-dom";
import { Container, WeekBox, WeeksContainer } from "./styles";
import { useEffect, useState } from "react";
import { getWeeks } from "../../api";
import Loading from "../../components/Loading";

interface Week {
  id: number;
  title: string;
  description: string;
}

function ExploreTopicsPage() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const weeks = await getWeeks();
        setWeeks(weeks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeks();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <Container id="about-container">
      <h1>Explore</h1>
      <WeeksContainer>
        {loading ? (
          <Loading />
        ) : (
          weeks.length > 0 ? (
            weeks.map((week) => (
              <Link to={`/topics/explore/week/${week.id}`} key={week.id}>
                <WeekBox>
                  <h2>{week.title}</h2>
                  <p>{week.description}</p>
                </WeekBox>
              </Link>
            ))
          ) : (
            <p>There's still no weeks to show.</p>
          )
        )}
      </WeeksContainer>
    </Container>
  );
}

export default ExploreTopicsPage;