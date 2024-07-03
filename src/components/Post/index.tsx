import React, { useState } from "react";
import { z, ZodError } from 'zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { createAnswer } from '../../api';
import Button from "../Button";
import UserItem from "../UserItem";
import { AnswerContainer, PostActions, PostContainer, PostContent, PostFooter, PostHeader, PostMetaData, PostVotes } from "./styles";
import { FaArrowUp, FaArrowDown, FaPlus, FaShare } from "react-icons/fa";
import { FaMessage } from 'react-icons/fa6';
import { addAnswer } from '../../store/userSlice';
import { formatTimeAgo } from "../../utils/formatDate";
import { v4 } from "uuid";
import { RootState } from "../../store";

interface PostProps {
  id: string;
  author: string;
  authorId: string;
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
  content: z.string().min(10, 'Enter an answer with at least 10 characters.').max(500, 'Answer cannot exceed 500 characters.'),
});

function Post({ id, author, authorId, date, week, title, content, upvotes, downvotes, answerCount, actions }: PostProps) {
  const [isAnswering, setIsAnswering] = useState(false);
  const { register, handleSubmit } = useForm();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [post, setPost] = useState<PostProps>({
    id,
    author,
    authorId,
    date,
    week,
    title,
    content,
    upvotes,
    downvotes,
    answerCount,
    actions
  });

  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data: Record<string, string>) => {
    try {
      const validatedData = answerSchema.parse(data);

      const newAnswer = {
        id: v4(),
        author: currentUser?.name,
        authorId: currentUser?.id,
        date: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        content: validatedData.content,
      };

      console.log(newAnswer);
      const createdAnswer = await createAnswer(id, newAnswer);
      console.log(createdAnswer);

      dispatch(addAnswer({ postId: id, answer: createdAnswer }));
      setIsAnswering(false);

      const updatedPost = { ...post, answerCount: post.answerCount + 1 };
      setPost(updatedPost);
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

        <span>{post.upvotes - post.downvotes}</span>

        <button>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </PostVotes>

      <div className="post">
        <PostHeader>
          <div>
            <Link to={`/profile/${post.authorId}`}>
              <UserItem label="Posted by" userName={post.author} userPhoto={
                users.find(user => user.id === post.authorId)?.photoUrl || ''} />
            </Link>
            <span>
              Há {formatTimeAgo(new Date(post.date))}
            </span>
          </div>

          <Link to={`/topics/explore/week/${post.week}`}>
            <span className="week-tag">Week {post.week}</span>
          </Link>
        </PostHeader>

        <h1>{post.title}</h1>

        <PostContent>
          <p>{post.content}.</p>
        </PostContent>

        <div className="separator"></div>

        <PostFooter>
          <div className={post.actions ? '' : 'no-actions'}>
            {post.actions && (
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
                <span>{post.answerCount}+</span>
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