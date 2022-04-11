import "./online-users.styles.css";

import { useCollection } from "../../hooks/useCollection";
import Avatar from "../avatar/avatar.component";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents && documents.map(user=>(
          <div key= {user.id} className="user-list-item">
              <span>{user.displayName}</span>
              <Avatar photoURL={user.photoURL}/>
          </div>
      ))}
    </div>
  );
}
