import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AnswerContainer, AnswerContent, AnswerHeader, AnswerVotes } from "./styles";
import UserItem from "../UserItem";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatDate";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface AnswerProps {
  id: string;
  author: string;
  authorId: string;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

function Answer({ id, author, authorId, date, content, upvotes, downvotes }: AnswerProps) {
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <AnswerContainer key={id}>
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
              <UserItem label="Posted by" userName={author} userPhoto={
                users.find(user => user.id === authorId)?.photoUrl || ''} />
            </Link>
            <span>
              Há {formatTimeAgo(new Date(date))}
            </span>
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
