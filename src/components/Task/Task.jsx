import "./task.css";
import { useState, useEffect, useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Detail from "./Detail";
import { TaskContext } from "../Board/ContextFromBoard";

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleClick = () => {
    setIsDetailOpen(true);
  };

  const { setTasks } = useContext(TaskContext);

  useEffect(() => {
    if (task.status === 2) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id
            ? {
                ...t,
                endDate: new Date()
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19),
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
      </div>
      <Detail
        task={task}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
}

export default Task;
