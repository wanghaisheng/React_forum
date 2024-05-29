import UserItem from "../UserItem"
import { PostContainer, PostContent, PostFooter, PostMetaData, PostVotes } from "./styles"

import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import { FaMessage } from 'react-icons/fa6'

function Post() {
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
        <h1>Post 1</h1>

        <PostContent>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum odio quidem quisquam ex recusandae rerum quam? Corporis quos, quo adipisci quae, explicabo laborum cumque aliquam, placeat voluptatum architecto odio ab.</p>
        </PostContent>

        <div className="separator"></div>

        <PostFooter>
          <UserItem label="Posted by" userName="John Doe" />

          <PostMetaData>
            <span>12h ago</span>

            <div>
              <FaMessage size={14} />
              <span>10+</span>
            </div>
          </PostMetaData>
        </PostFooter>
      </div>
    </PostContainer>
  )
}

export default Post
