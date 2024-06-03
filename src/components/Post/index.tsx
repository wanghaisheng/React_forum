import { useState } from "react";
import { z, ZodError } from 'zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addAnswer } from '../../store/userSlice';
import Button from "../Button";
import UserItem from "../UserItem";
import { AnswerContainer, PostActions, PostContainer, PostContent, PostFooter, PostHeader, PostMetaData, PostVotes } from "./styles";
import { FaArrowUp, FaArrowDown, FaPlus, FaShare } from "react-icons/fa";
import { FaMessage } from 'react-icons/fa6';
import { Link } from "react-router-dom";

interface PostProps {
  id: number;
  author: string;
  authorId: number;
  date: string;
  week: number;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  answerCount: number;
  actions?: React.ReactNode;
}

const answerSchema = z.object({
  content: z.string().min(10, 'Enter a answer with at least 10 characters.').max(500, 'Answer cannot exceed 500 characters.'),
});

function Post({ id, author, authorId, date, week, title, content, upvotes, downvotes, answerCount, actions }: PostProps) {
  const [isAnswering, setIsAnswering] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data: Record<string, string>) => {
    try {
      const validatedData = answerSchema.parse(data);

      const newAnswer = {
        id: Math.floor(Math.random() * 100000000) + 1,
        author: 'John Doe',
        authorId: 1,
        date: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        content: validatedData.content,
      };

      dispatch(addAnswer({ postId: id, answer: newAnswer }));

      console.log('Dados da resposta:', newAnswer);

      setIsAnswering(false);
    } catch (error) {
      console.error('Erro de validação:', error);
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path.join('.')] = err.message;
          }
        });
        setFormErrors(fieldErrors);
      }
    }
  });

  return (
    <PostContainer>
      <PostVotes>
        <button>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>{upvotes - downvotes}</span>

        <button>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </PostVotes>

      <div className="post">
        <PostHeader>
          <div>
            <Link to={`/profile/${authorId}`}>
              <UserItem label="Posted by" userName={author} />
            </Link>
            <span>12h ago</span>
          </div>

          <Link to={`/topics/explore/week/${week}`}>
            <span className="week-tag">Week {week}</span>
          </Link>
        </PostHeader>

        <h1>{title}</h1>

        <PostContent>
          <p>{content}.</p>
        </PostContent>

        <div className="separator"></div>

        <PostFooter>
          <div className={actions ? '' : 'no-actions'}>
            {actions && (
              <PostActions>
                <Button variant="transparent" onClick={() => setIsAnswering(true)}>
                  <FaPlus size={14} />
                  Add answer
                </Button>

                <Button variant="transparent">
                  <FaShare size={14} />
                  Share
                </Button>
              </PostActions>
            )}

            <PostMetaData>
              <div>
                <FaMessage size={14} />
                <span>{answerCount}+</span>
              </div>
            </PostMetaData>
          </div>

          {isAnswering && (
            <AnswerContainer onSubmit={onSubmit}>
              <textarea
                placeholder="Type your answer here..."
                {...register("content")}
                className={isAnswering ? 'active' : ''}
              />
              {formErrors.content && <span className='error-message'>{formErrors.content}</span>}
              <div className="answer-actions">
                <Button variant="transparent" onClick={() => setIsAnswering(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="confirm">
                  Answer
                </Button>
              </div>
            </AnswerContainer>
          )}
        </PostFooter>
      </div>
    </PostContainer>
  );
}

export default Post;