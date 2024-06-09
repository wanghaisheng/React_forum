import { Link } from "react-router-dom";
import { Container, WeekBox, WeeksContainer } from "./styles";

function ExploreTopicsPage() {
  const weeks = [
    {
      id: 1,
      title: 'Week 1',
      description: 'Basic Introduction - Sprint 1'
    },
    {
      id: 2,
      title: 'Week 2',
      description: 'Web Development | Sprint 1'
    },
    {
      id: 3,
      title: 'Week 3',
      description: 'JavaScript | Sprint 2'
    },
    {
      id: 4,
      title: 'Week 4',
      description: 'Project Development (1st challenge) | Sprint 2'
    },
    {
      id: 5,
      title: 'Week 5',
      description: 'Learning Modern JavaScript (ES6) & TypeScript | Sprint 3'
    },
    {
      id: 6,
      title: 'Week 6',
      description: 'Getting Started with React.js | Sprint 3'
    },
    {
      id: 7,
      title: 'Week 7',
      description: 'Deepening with React.js | Sprint 4'
    },
    {
      id: 8,
      title: 'Week 8',
      description: '2nd Challenge (React.js with TypeScript) | Sprint 4'
    },
    {
      id: 9,
      title: 'Week 9',
      description: '20+ Projects in React JS learn Redux, Bootstrap, APIs'
    },
    {
      id: 10,
      title: 'Week 10',
      description: 'Frontend Testing'
    },
    {
      id: 11,
      title: 'Week 11',
      description: 'Cloud Computing on AWS'
    },
    {
      id: 12,
      title: 'Week 12',
      description: 'Guided Project: Hosting a static website on AWS S3'
    },
    {
      id: 13,
      title: 'Week 13',
      description: 'AWS Cloud Practitioner'
    },
    {
      id: 14,
      title: 'Week 14',
      description: 'AWS Cloud Practitioner'
    },
    {
      id: 15,
      title: 'Week 15',
      description: 'Week 15 :: AWS Cloud Practitioner'
    },
    {
      id: 16,
      title: 'Week 16',
      description: 'AWS Cloud Practitioner'
    },
    {
      id: 17,
      title: 'Week 17',
      description: 'AWS Cloud Practitioner'
    },
    {
      id: 18,
      title: 'Week 18',
      description: 'AWS Cloud Practitioner'
    },
    {
      id: 19,
      title: 'Week 19',
      description: 'AWS Cloud Practitioner'
    },
    {
      id: 20,
      title: 'Week 20',
      description: 'AWS Cloud Practitioner'
    },
  ];

  return (
    <Container id="about-container">
      <h1>Explore</h1>
      <WeeksContainer>
        {
          weeks.map(week => (
            <Link key={week.id} to={`/topics/explore/week/${week.id}`}>
              <WeekBox>
                <h2>{week.title}</h2>
                <p>{week.description}</p>
              </WeekBox>
            </Link>
          )).reverse()
        }
      </WeeksContainer>
    </Container>
  )
}

export default ExploreTopicsPage;
