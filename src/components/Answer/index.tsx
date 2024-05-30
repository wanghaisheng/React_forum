import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AnswerContainer, AnswerContent, AnswerHeader, AnswerVotes } from "./styles";
import UserItem from "../UserItem";

function Answer() {
  return (
    <AnswerContainer>
      <AnswerVotes>
        <button>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>10</span>

        <button>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </AnswerVotes>

      <div className="answer">
        <AnswerHeader>
          <UserItem label="Answered by" userName="Jane Doe" />
          <span>12h ago</span>
        </AnswerHeader>

        <AnswerContent>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum odio quidem quisquam ex recusandae rerum quam? Corporis quos, quo adipisci quae, explicabo laborum cumque aliquam, placeat voluptatum architecto odio ab.</p>
        </AnswerContent>
      </div>
    </AnswerContainer>
  )
}

export default Answer;
