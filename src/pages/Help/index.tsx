import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Container, HelpInfo, ListItem, QuestionHeader } from "./styles";
import { useState } from "react";
import { Link } from "react-router-dom";

function HelpPage() {
  const faqs = [
    {
      id: 1,
      question: 'How long are my data stored?',
      answer: 'Your data is stored for the duration of the scholarship program, but you can request deletion at any time.'
    },
    {
      id: 2,
      question: 'How do I delete a topic?',
      answer: 'It is currently not possible to delete a topic, but you can contact the developer to request deletion. Visit the About page for more information.'
    },
    {
      id: 3,
      question: 'My topic was not answered, what should I do?',
      answer: 'Contact your program instructors and send the link to the topic to facilitate a response.'
    }
  ];


  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  function changeOpenQuestion(id: number) {
    setOpenQuestionId(openQuestionId === id ? null : id);
  }

  return (
    <Container id="about-container">
      <HelpInfo>
        <section>
          <h2>Help</h2>

          {faqs.map(faq => (
            <ListItem
              key={faq.id}
              open={openQuestionId === faq.id}
              onClick={() => changeOpenQuestion(faq.id)}
              className={openQuestionId === faq.id ? 'open' : ''}
            >
              <QuestionHeader>
                <div>
                  <span>0{faq.id}.</span>
                  <h3>{faq.question}</h3>
                </div>
                {openQuestionId === faq.id ? <FaArrowUp size={18} /> : <FaArrowDown size={18} />}
              </QuestionHeader>
              <div className={openQuestionId === faq.id ? 'answer visible' : 'answer invisible'}>
                <p>{faq.answer}</p>
              </div>
            </ListItem>
          ))}
        </section>

        <section>
          <h2>Still need help?</h2>
          <p>
            If you still have questions, visit the About page:
          </p>
          <Link to="/about">About</Link>
        </section>
      </HelpInfo>
    </Container>
  );
}

export default HelpPage;
