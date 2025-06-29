import { useState, useEffect } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Column from "./Column";
import { Flex } from "antd";
import { arrayMove } from "@dnd-kit/sortable";

export default function Board() {
  const [columns, setColumns] = useState([
    { title: "To Do", tasks: [], status: 0 },
    { title: "In Progress", tasks: [], status: 1 },
    { title: "Done", tasks: [], status: 2 },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 101,
      title: "Sample Task",
      description: "This is a sample task description.",
      assignee: "Maria",
      priority: "warning",
      dueTime: "2023-10-31",
      startDate: "2023-10-01",
      endDate: "2023-10-15",
      status: 0,
    },
    {
      id: 102,
      title: "Another Task",
      description: "This is another task description.",
      assignee: "John",
      priority: "normal",
      dueTime: "2024-10-31",
      startDate: "2022-10-01",
      endDate: "2023-10-15",
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

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <DndContext
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <Flex>
        {columns.map((column) => (
          <Column
            key={column.status}
            column={column}
            onAddTask={handleAddTask}
          />
        ))}
      </Flex>
    </DndContext>
  );
}
