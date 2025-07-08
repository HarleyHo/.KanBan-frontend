import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
import { useDroppable } from "@dnd-kit/core";
import { PlusOutlined } from "@ant-design/icons";
import { TaskContext, CountContext } from "../../contexts/TaskContext";
import { useContext } from "react";

const AddTaskButton = ({ status, onAddTask }) => {
  if (status === 2) return <div className="add-task-button" />;
  return (
    <div className="add-task-button" onClick={onAddTask}>
      <PlusOutlined />
    </div>
  );
};

function Column({ column }) {
  const { setTasks } = useContext(TaskContext);
  const { newTaskCount } = useContext(CountContext);

  const handleAddTask = () => {
    setTasks((prevTasks) => {
      const newTask = {
        id: prevTasks[prevTasks.length - 1].id + 1,
        name: "New Task " + newTaskCount.current,
        description: "",
        assignee: "",
        priority: "",
        dueDate: "",
        startDate: "",
        endDate: "",
        status: column.status,
      };
      return [...prevTasks, newTask];
    });
    newTaskCount.current++;
  };

  const { setNodeRef } = useDroppable({
    id: column.status,
  });

  return (
    <div className="column">
      {column.title}
      <AddTaskButton status={column.status} onAddTask={handleAddTask} />
      <SortableContext
        items={column.tasks}
        strategy={verticalListSortingStrategy}
      >
        <div className="column-droppable" ref={setNodeRef}>
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default Column;
