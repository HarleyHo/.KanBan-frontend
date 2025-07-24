import "./task-box.css";
import { useState, useEffect, useRef, useContext } from "react";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskContext, CountContext } from "../../contexts/TaskContext";
import { fetchTasks } from "../../services/taskService";
import Column from "./Column";
import { CurrentEventContext } from "../../contexts/EventContext";
import { editTask } from "../../services/taskService";

function TaskBox() {
  const [tasks, setTasks] = useState([]);
  const { currentEvent } = useContext(CurrentEventContext);
  
  useEffect(() => {
    fetchTasks({ eventId: currentEvent.id }).then((result) => {
      setTasks([...result.data]);
    });
  }, [currentEvent, setTasks]);

  console.log(tasks);
  const [columns, setColumns] = useState([
    { title: "To Do", tasks: [], status: 0 },
    { title: "In Progress", tasks: [], status: 1 },
    { title: "Done", tasks: [], status: 2 },
  ]);

  useEffect(() => {
    setColumns((prevColumns) => {
      return prevColumns.map((col) => ({
        ...col,
        tasks: tasks.filter((task) => task.status === col.status),
      }));
    });
  }, [tasks]);

  const findTargetColumn = ({ id }) => {
    if (!Number.isFinite(id)) return NaN;

    if (columns.some((col) => col.status === id)) {
      return columns.find((col) => col.status === id).status;
    } else {
      return tasks.find((task) => task.id === id).status;
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    const activeColumn = findTargetColumn({ id: active.id });
    const overColumn = findTargetColumn({ id: over.id });

    if (
      !Number.isFinite(activeColumn) ||
      !Number.isFinite(overColumn) ||
      activeColumn === overColumn
    )
      return;

    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === active.id ? { ...task, status: overColumn } : task
      );
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeColumn = findTargetColumn({ id: active.id });
    const overColumn = findTargetColumn({ id: over.id });

    if (
      !Number.isFinite(activeColumn) ||
      !Number.isFinite(overColumn) ||
      activeColumn !== overColumn ||
      active.id === over.id
    )
      return;

    const columnTasks = columns.find(
      (col) => col.status === activeColumn
    ).tasks;

    const activeIndex = columnTasks.findIndex((task) => task.id === active.id);
    const overIndex = columnTasks.findIndex((task) => task.id === over.id);

    setColumns((prevColumns) => {
      return prevColumns.map((col) =>
        col.status === activeColumn
          ? { ...col, tasks: arrayMove(columnTasks, activeIndex, overIndex) }
          : col
      );
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const newTaskCount = useRef(1);

  return (
    <div className="task-box">
      <DndContext
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="task-box-body">
          {columns.map((column) => (
            <TaskContext.Provider key={column.status} value={{ setTasks }}>
              <CountContext.Provider
                key={column.status}
                value={{ newTaskCount }}
              >
                <Column key={column.status} column={column} />
              </CountContext.Provider>
            </TaskContext.Provider>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default TaskBox;
