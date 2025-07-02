import "./board.css";
import { useState, useEffect, useRef } from "react";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskContext, CountContext } from "./ContextFromBoard";

function Board() {
  const [columns, setColumns] = useState([
    { title: "To Do", tasks: [], status: 0 },
    { title: "In Progress", tasks: [], status: 1 },
    { title: "Done", tasks: [], status: 2 },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 101,
      name: "Sample Task",
      description: "This is a sample task description.",
      assignee: "Maria",
      priority: "warning",
      dueDate: "2023-10-31",
      startDate: "2023-10-01",
      endDate: "",
      status: 0,
    },
    {
      id: 102,
      name: "Another Task",
      description: "This is another task description.",
      assignee: "John",
      priority: "normal",
      dueDate: "2024-01-31",
      startDate: "2023-10-01",
      endDate: "",
      status: 0,
    },
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
    if (!id) return;

    if (columns.some((col) => col.status === id)) {
      return columns.find((col) => col.status === id).status ?? NaN;
    } else {
      return tasks.find((task) => task.id === id).status ?? NaN;
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    const activeColumn = findTargetColumn({ id: active.id }) ?? NaN;
    const overColumn = findTargetColumn({ id: over.id }) ?? NaN;

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
    const activeColumn = findTargetColumn({ id: active.id }) ?? NaN;
    const overColumn = findTargetColumn({ id: over.id }) ?? NaN;

    if (
      !Number.isFinite(activeColumn) ||
      !Number.isFinite(overColumn) ||
      activeColumn !== overColumn
    )
      return;

    let columnTasks = columns.find((col) => col.status === activeColumn).tasks;

    const activeIndex = columnTasks.findIndex((task) => task.id === active.id);
    const overIndex = columnTasks.findIndex((task) => task.id === over.id);
    columnTasks = arrayMove(columnTasks, activeIndex, overIndex);
    setColumns((prevColumns) => {
      return prevColumns.map((col) =>
        col.status === activeColumn ? { ...col, tasks: columnTasks } : col
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
      <header className="board-header">
        <h1 className="board-title">Board</h1>
      </header>
      <DndContext
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="board-body">
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

export default Board;
