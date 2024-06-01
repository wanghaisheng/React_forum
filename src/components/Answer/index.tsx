import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AnswerContainer, AnswerContent, AnswerHeader, AnswerVotes } from "./styles";
import UserItem from "../UserItem";
import { Link } from "react-router-dom";

interface AnswerProps {
  id: number;
  author: string;
  authorId: number;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}


function Answer({ id, author, authorId, date, content, upvotes, downvotes }: AnswerProps) {
  return (
    <AnswerContainer>
      <AnswerVotes>
        <button>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>{upvotes - downvotes}</span>

        <button>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </AnswerVotes>

      <div className="answer">
        <AnswerHeader>
          <div>
            <Link to={`/profile/${authorId}`}>
              <UserItem label="Posted by" userName={author} />
            </Link>
            <span>12h ago</span>
          </div>
        </AnswerHeader>

        <AnswerContent>
          <p>{content}</p>
        </AnswerContent>
      </div>
    </AnswerContainer>
  )
}

export default Answer;
