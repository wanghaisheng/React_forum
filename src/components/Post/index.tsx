import React, { useEffect, useState } from "react";
import { z, ZodError } from 'zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { createAnswer, getPostById, getUserById } from '../../api';
import Button from "../Button";
import UserItem from "../UserItem";
import { AnswerContainer, PostActions, PostContainer, PostContent, PostFooter, PostHeader, PostMetaData, PostVotes } from "./styles";
import { FaArrowUp, FaArrowDown, FaPlus, FaShare } from "react-icons/fa";
import { FaMessage } from 'react-icons/fa6';
import { Post as PostSlice, addAnswer, setUsers } from '../../store/userSlice';
import { upvotePostThunk, downvotePostThunk } from '../../store/voteThunks';
import { formatTimeAgo } from "../../utils/formatDate";
import { v4 } from "uuid";
import { AppDispatch, RootState } from "../../store";

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
  const postState = useSelector((state: RootState) => state.user.posts.find(post => post.id === id));
  const [post, setPost] = useState<PostProps>({
    id: postState?.id || id,
    author: postState?.author || author,
    authorId: postState?.authorId || authorId,
    date: postState?.date || date,
    week: postState?.week || week,
    title: postState?.title || title,
    content: postState?.content || content,
    upvotes,
    downvotes,
    answerCount: postState?.answers.length || answerCount,
    actions
  });

  const users = useSelector((state: RootState) => state.user.users);
  const userVotedPosts = useSelector((state: RootState) => state.user.currentUser?.votedPosts);
  const weeks = useSelector((state: RootState) => state.user.weeks);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const [isVoting, setIsVoting] = useState(false); // Estado para controlar se está votando
  const [userVote, setUserVote] = useState<string>(''); // Estado para controlar o voto do usuário

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

      const createdAnswer = await createAnswer(id, newAnswer);
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

  const handleUpvote = async (postId: string) => {
    if (currentUser && !isVoting) { // Verifica se não está votando para evitar spam
      setIsVoting(true);

      try {
        await dispatch(upvotePostThunk({ postId, voteType: 'up' }))
          .then((response) => {
            if (!response.payload) return;
            const updatedPost = response.payload as PostSlice;
            setPost((prevPost) => ({
              ...prevPost,
              upvotes: updatedPost.upvotes,
              downvotes: updatedPost.downvotes,
            }));
            if (userVote === 'up') {
              setUserVote('');
            } else {
              setUserVote('up'); // Define o voto do usuário para 'up'
            }

          })
          .catch((error: Error) => console.error('Failed to upvote post:', error));
      } finally {
        setTimeout(() => {
          setIsVoting(false); // Define que não está mais votando
        }, 2000);
      }
    }
  };

  const handleDownvote = async (postId: string) => {
    if (currentUser && !isVoting) { // Verifica se não está votando para evitar spam
      setIsVoting(true);

      try {
        await dispatch(downvotePostThunk({ postId, voteType: 'down' }))
          .then((response) => {
            if (!response.payload) return;
            const updatedPost = response.payload as PostSlice;
            setPost((prevPost) => ({
              ...prevPost,
              upvotes: updatedPost.upvotes,
              downvotes: updatedPost.downvotes,
            }));
            if (userVote === 'down') {
              setUserVote('');
            } else {
              setUserVote('down'); // Define o voto do usuário para 'down'
            }

          })
          .catch((error: Error) => console.error('Failed to downvote post:', error));
      } finally {
        setTimeout(() => {
          setIsVoting(false); // Define que não está mais votando
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (currentUser) {
        const user = await getUserById(currentUser.id);
        setUserVote(user.votedPosts.find(vote => vote.id === post.id)?.vote || '');
      }
    };

    fetchCurrentUser();

  }, [
    currentUser,
    post.id,
  ]);

  return (
    <PostContainer>
      <PostVotes>
        <button onClick={() => handleUpvote(post.id)} disabled={isVoting} className={userVote === 'up' ? 'voted' : ''}>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>{post.upvotes - post.downvotes}</span>

        <button onClick={() => handleDownvote(post.id)} disabled={isVoting} className={userVote === 'down' ? 'voted' : ''}>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </PostVotes>

      <div className="post">
        <PostHeader>
          <div>
            <Link to={`/profile/${post.authorId}`}>
              <UserItem label="Posted by" userName={post.author} userPhoto={users.find(user => user.id === post.authorId)?.photoUrl || ''} />
            </Link>
            <span>
              Há {formatTimeAgo(new Date(post.date))}
            </span>
          </div>

          <Link to={`/topics/explore/week/${weeks.find(week => week.weekNumber === post.week)?.id || post.week}`}>
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
              <div>
                <Button variant="confirm" type="submit">Submit</Button>
                <Button variant="transparent" onClick={() => setIsAnswering(false)}>Cancel</Button>
              </div>
            </AnswerContainer>
          )}
        </PostFooter>
      </div>
    </PostContainer>
  );
}

export default Post;