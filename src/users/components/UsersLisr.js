import "./UserList.css";
import UserItem from "./UserItem";
import { v4 as uuid } from "uuid";
import Card from "../../shared/Components/UIElements/Card";
export default function UserLisr(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users Found ....</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => {
        console.log("user", user);
        return (
          <UserItem
            key={user._id}
            id={user._id}
            name={user.name}
            image={user.image}
            placeCount={user.place.length}
          />
        );
      })}
    </ul>
  );
}
