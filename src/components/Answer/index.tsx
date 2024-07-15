import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AnswerContainer, AnswerContent, AnswerHeader, AnswerVotes } from "./styles";
import UserItem from "../UserItem";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatDate";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { upvoteAnswerThunk, downvoteAnswerThunk } from '../../store/voteThunks';

interface AnswerProps {
  id: string;
  author: string;
  authorId: string;
  date: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

const Answer = ({ id, author, authorId, date, content, upvotes, downvotes }: AnswerProps) => {
  const users = useSelector((state: RootState) => state.user.users);
  const postState = useSelector((state: RootState) => state.user.currentPost);
  const answerState = postState?.answers.find(answer => answer.id === id);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [isVoting, setIsVoting] = useState(false);
  const [answer, setAnswer] = useState<AnswerProps>({
    id: answerState?.id || id,
    author: answerState?.author || author,
    authorId: answerState?.authorId || authorId,
    date: answerState?.date || date,
    content: answerState?.content || content,
    upvotes,
    downvotes,
  });

  const handleVote = async (answerId: string, voteType: 'up' | 'down') => {
    if (currentUser && !isVoting && answerState) {
      setIsVoting(true);
      const postId = postState?.id || '';

      try {
        const thunkAction = voteType === 'up' ? upvoteAnswerThunk : downvoteAnswerThunk;
        await dispatch(thunkAction({ postId, answerId, voteType }))
          .then((response) => {
            if (!response.payload) return;
            const updatedAnswer = response.payload as AnswerProps;

            setAnswer((prevAnswer) => ({
              ...prevAnswer,
              upvotes: updatedAnswer?.upvotes || 0,
              downvotes: updatedAnswer?.downvotes || 0,
            }));

          })
          .catch((error: Error) => console.error(`Failed to ${voteType}vote answer:`, error));
      } finally {
        setTimeout(() => {
          setIsVoting(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    console.log('answerState', answerState);
  }, [answerState]);

  if (!answerState) {
    return null;
  }


  return (
    <AnswerContainer key={answer.id}>
      <AnswerVotes>
        <button onClick={() => handleVote(answer.id, 'up')} disabled={isVoting} className={
          users.find(user => user.id === currentUser?.id)?.votedAnswers.find(vote => vote.postId === postState?.id && vote.answerId === answer.id && vote.vote === 'up') ? 'voted' : ''
        }>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>{
          answer.upvotes - answer.downvotes
        }
        </span>

        <button onClick={() => handleVote(answer.id, 'down')} disabled={isVoting} className={
          users.find(user => user.id === currentUser?.id)?.votedAnswers.find(vote => vote.postId === postState?.id && vote.answerId === answer.id && vote.vote === 'down') ? 'voted' : ''
        }>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </AnswerVotes>

      <div className="answer">
        <AnswerHeader>
          <div>
            <Link to={`/profile/${answer.authorId}`}>
              <UserItem
                label="Posted by"
                userName={answer.author}
                userPhoto={users.find(user => user.id === answer.authorId)?.photoUrl || ''}
              />
            </Link>
            <span>
              Há {formatTimeAgo(new Date(answer.date))}
            </span>
          </div>
        </AnswerHeader>

        <AnswerContent>
          <p>{answer.content}</p>
        </AnswerContent>
      </div>
    </AnswerContainer>
  );
}

export default Answer;