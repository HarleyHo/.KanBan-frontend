import "./task.css";
import { useState, useEffect, useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Detail from "./TaskDetail";
import { TaskContext, PriorityContext } from "../../contexts/TaskContext";
import { UserContext } from "../../contexts/UserContext";
import { Avatar } from "antd";
import {
  DownOutlined,
  MinusOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";

const priorityOptions = [
  {
    id: 0,
    label: <DownOutlined style={{ color: "green" }} />,
    value: "Normal",
  },
  {
    id: 1,
    label: <MinusOutlined style={{ color: "yellow" }} />,
    value: "Warning",
  },
  {
    id: 2,
    label: <UpOutlined style={{ color: "red" }} />,
    value: "Danger",
  },
];

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { setTasks } = useContext(TaskContext);
  const { users } = useContext(UserContext);

  const handleClick = () => {
    setIsDetailOpen(true);
  };

  useEffect(() => {
    if (task.status === 2) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id
            ? {
                ...t,
                endDate: new Date()
                  .toISOString()
                  .substring(0, 10),
              }
            : t
        )
      );
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id
            ? {
                ...t,
                endDate: "",
              }
            : t
        )
      );
    }
  }, [task.status, task.id, setTasks]);

  return (
    <>
      <div
        className="task"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={handleClick}
      >
        <h2 className="task-name over-hide">{task.name}</h2>
        {users.some((user) => user.id === task.assigneeId) ? (
          <Avatar
            src={users.find((user) => user.id === task.assigneeId).iconUrl}
          />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
        {priorityOptions.some(
          (opt) => opt.id === task.priority
        ) ? (
          <div>
            {
              priorityOptions.find(
                (opt) => opt.id === task.priority
              ).label
            }
          </div>
        ) : (
          <div />
        )}
      </div>
      <PriorityContext.Provider value={{ priorityOptions }}>
        <Detail
          task={task}
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
        />
      </PriorityContext.Provider>
    </>
  );
}

export default Task;
