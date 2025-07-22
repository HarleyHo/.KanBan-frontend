import "./task-box.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";
import { PlusOutlined } from "@ant-design/icons";
import { TaskContext, CountContext } from "../../contexts/TaskContext";
import { useContext } from "react";
import { CurrentEventContext } from "../../contexts/EventContext";
import { addTask } from "../../services/taskService";

const AddTaskButton = ({ status, onAddTask }) => {
  if (status === 2) return <div className="add-task-button-none"/>;
  return (
    <div className="add-task-button" onClick={onAddTask}>
      <PlusOutlined />
    </div>
  );
};

function Column({ column }) {
  const { setTasks } = useContext(TaskContext);
  const { newTaskCount } = useContext(CountContext);
  const { currentEvent } = useContext(CurrentEventContext);

  const handleAddTask = () => {
    const newTask = {
      name: "New Task " + newTaskCount.current,
      description: "",
      assigneeId: "",
      priority: "",
      dueDate: "",
      startDate: "",
      endDate: "",
      status: column.status,
      eventId: currentEvent.id,
    };

    addTask({ task: newTask }).then((result) => {
      setTasks((prevTasks) => [...prevTasks, result.data]);
    });
    newTaskCount.current++;
  };

  const { setNodeRef } = useDroppable({
    id: column.status,
  });

  return (
    <div className="column">
      <div className="column-head">
        {column.title}
        <AddTaskButton status={column.status} onAddTask={handleAddTask} />
      </div>

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
