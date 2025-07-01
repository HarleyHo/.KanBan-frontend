import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Detail from "./Detail";

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleClick = () => {
    setIsDetailOpen(true)
  };

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
