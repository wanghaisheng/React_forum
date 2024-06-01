import { useState } from "react"
import Button from "../Button"
import UserItem from "../UserItem"
import { AnswerContainer, PostActions, PostContainer, PostContent, PostFooter, PostHeader, PostMetaData, PostVotes } from "./styles"

import { FaArrowUp, FaArrowDown, FaPlus, FaShare } from "react-icons/fa"
import { FaMessage } from 'react-icons/fa6'
import { Link } from "react-router-dom"

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

function Post({ id, author, authorId, date, week, title, content, upvotes, downvotes, answerCount, actions }: PostProps) {
  const [isAnswering, setIsAnswering] = useState(false);

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
            <AnswerContainer>
              <textarea placeholder="Type your answer here..." className={isAnswering ? 'active' : ''} />
              <div className="answer-actions">
                <Button variant="transparent" onClick={() => setIsAnswering(false)}>
                  Cancel
                </Button>

                <Button variant="confirm">
                  Answer
                </Button>
              </div>
            </AnswerContainer>
          )}
        </PostFooter>
      </div>
    </PostContainer>
  )
}

export default Post
