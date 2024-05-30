import { useState } from "react"
import Button from "../Button"
import UserItem from "../UserItem"
import { AnswerContainer, PostActions, PostContainer, PostContent, PostFooter, PostHeader, PostMetaData, PostVotes } from "./styles"

import { FaArrowUp, FaArrowDown, FaPlus, FaShare } from "react-icons/fa"
import { FaMessage } from 'react-icons/fa6'

interface PostProps {
  actions?: React.ReactNode;
}

function Post({ actions }: PostProps) {
  const [isAnswering, setIsAnswering] = useState(false);

  return (
    <PostContainer>
      <PostVotes>
        <button>
          <FaArrowUp className="up-vote" size={16} />
        </button>

        <span>10</span>

        <button>
          <FaArrowDown className="down-vote" size={16} />
        </button>
      </PostVotes>

      <div className="post">
        <PostHeader>
          <UserItem label="Posted by" userName="John Doe" />
          <span>12h ago</span>
        </PostHeader>

        <h1>Post 1</h1>

        <PostContent>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum odio quidem quisquam ex recusandae rerum quam? Corporis quos, quo adipisci quae, explicabo laborum cumque aliquam, placeat voluptatum architecto odio ab.</p>
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
                <span>10+</span>
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
