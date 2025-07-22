import { useContext } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CurrentEventContext } from "../../contexts/EventContext";
import { UserContext } from "../../contexts/UserContext";
import TaskBox from "../Task/TaskBox";
import EventDetail from "../Event/EventDetail";
import "./board.css";

function Board() {
  const { currentEvent } = useContext(CurrentEventContext);
  const { users } = useContext(UserContext);

  return (
    <div className="board">
      <div className="board-header">
        <div className="board-header-left">
          <h2 className="board-header-name">{currentEvent.name}</h2>
          <div className="board-header-edit">
            <EventDetail />
          </div>
        </div>
        <div className="board-header-avatar">
          <Avatar.Group >
          {users.map((user) => (
            <Avatar  src={user.iconUrl} />
          ))}
        </Avatar.Group>
        </div>
        
      </div>

      <TaskBox />
    </div>
  );
}

export default Board;
