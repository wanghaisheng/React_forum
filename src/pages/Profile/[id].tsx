import { Container, ProfileHeader, UserInfo, UserPhoto } from "./styles";

import { FaCalendar } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import Post from "../../components/Post";

function ProfilePage() {
  return (
    <Container>
      <ProfileHeader>
        <div className="photo">
          <UserPhoto>
            <div></div>
          </UserPhoto>
        </div>
        <UserInfo>
          <h1>John Doe</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

          <div>
            <div>
              <FaCalendar size={14} />
              <span>Joined on 01/01/2021</span>
            </div>
            <div>
              <FaMessage />
              <span>10 posts</span>
            </div>
          </div>
        </UserInfo>
      </ProfileHeader>

      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  )
}

export default ProfilePage;
