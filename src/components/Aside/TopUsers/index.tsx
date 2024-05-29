import User from "../../UserItem";
import { TopUsersContainer } from "./styles";

function TopUsers() {
  const users = [
    { userName: 'John Doe', followers: 100 },
    { userName: 'Jane Doe', followers: 200 },
    { userName: 'Alice', followers: 300 },
    { userName: 'Bob', followers: 400 },
  ];

  return (
    <TopUsersContainer>
      <h3>Top Users</h3>
      <ul className="users-list">
        {users.map((user, index) => (
          <li key={index}>
            <User userName={user.userName} followers={user.followers} />
          </li>
        ))}

        <div className="separator"></div>

        <User userName="You" followers={500} />
      </ul>
    </TopUsersContainer>
  )
}

export default TopUsers;
