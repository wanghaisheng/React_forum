import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AnswerContainer, AnswerContent, AnswerHeader, AnswerVotes } from "./styles";
import UserItem from "../UserItem";
import { Link, useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatDate";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { upvoteAnswerThunk, downvoteAnswerThunk } from '../../store/voteThunks';
import { getUserById } from '../../api';

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
  const navigate = useNavigate();
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState<string>(''); // Estado para controlar o voto do usuário
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

    if (!currentUser) {
      navigate('/signin');
      return;
    }

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

            if (voteType === 'up') {
              if (userVote === 'up') {
                setUserVote('');
              } else {
                setUserVote('up');
              }
            } else if (voteType === 'down') {
              if (userVote === 'down') {
                setUserVote('');
              } else {
                setUserVote('down');
              }
            }

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
    const fetchCurrentUser = async () => {
      if (currentUser) {
        const user = await getUserById(currentUser.id);
        setUserVote(user.votedAnswers.find(vote => vote.answerId === answer.id)?.vote || '');
      }
    };

    fetchCurrentUser();
  }, [
    currentUser,
    answer.id,
  ]);

  if (!answerState) {
    return null;
  }


  return (
    <AnswerContainer key={answer.id}>
      <AnswerVotes>
        <button onClick={() => handleVote(answer.id, 'up')} disabled={isVoting} className={userVote === 'up' ? 'voted' : ''}>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>{
          answer.upvotes - answer.downvotes
        }
        </span>

        <button onClick={() => handleVote(answer.id, 'down')} disabled={isVoting} className={userVote === 'down' ? 'voted' : ''}>
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